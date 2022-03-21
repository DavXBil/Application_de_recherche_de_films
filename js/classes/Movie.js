
export { Movie }

class Movie {

        constructor() {
                this.key = "f6e256e1"
        }

        displayMovies(value, moviesSection, page) {

                let articles = ""

                fetch(`http://www.omdbapi.com/?s=${value}&page=${page}&apikey=${this.key}`)
                .then(function(response) {
                        if (response.ok) {

                                response.json().then(function(data) {

                                        
                                        let pagesNumber = Math.ceil(data['totalResults'] / 10)


                                        data['Search'].forEach(movie => {

                                                let poster

                                                if(movie["Poster"] == "N/A") {
                                                        poster = "./public/img/no_image.png"
                                                } else {
                                                        poster = movie["Poster"]
                                                }
                        
                                                articles += `
                                                        <article class="movie_thumbnail" i=${movie["imdbID"]}>
                                                                <a href="./movie_card.html?i=${movie["imdbID"]}">
                        
                                                                        <img src=${poster} alt="${movie["Title"]} poster"></img>
                        
                                                                        <p>${movie['Title']}</p>
                        
                                                                </a>
                                                        </article>
                                                `                                        
                                        });

                                        let paging = ""


                                        if (page > 1) {
                                                paging += `<a href="#" name=${value} id="pageprevious" class="paginglink">Précedent</a>`
                                        }
                                        
                                        for (let i = 1; i < pagesNumber; i++) {
                                                paging += `<a href="#" name=${value} id=${i} class="paginglink">${i}</a>`                                                
                                        }

                                        if (page < pagesNumber) {
                                                paging += `<a href="#" name=${value} id="pagenext" class="paginglink">Suivant</a>`
                                        }

                                        moviesSection.innerHTML = articles

                                          
                                        let pagingSection = document.querySelector("#paging")

                                        pagingSection.innerHTML = paging
                                })               

                        }  
                })
                
        }


        displayMovieDetail(value, movieSection) {
                
                let movieCard = ""

                let poster



                fetch(`http://www.omdbapi.com/?${value}&plot=full&apikey=${this.key}`)
                .then(function(response) {
                        if (response.ok) {
                                response.json().then(function(data) {

                                        if(data["Poster"] === "N/A") {
                                                poster = "../../public/img/no_image.png"
                                        } else {
                                                poster = data["Poster"]
                                        }

                                        console.log(data)
                                
                                        movieCard = `
                                                <img src="${poster}"></img>
                                                <h2>${data["Title"]}</h2>
                                                <div>
                                                        <p>genre: ${data["Genre"]}</p>
                                                        <p>${data["Released"]}</p>
                                                </div>
                                                <div>
                                                        <p>Synopsis: ${data["Plot"]}</p>
                                                </div>

                                                <div id='ratings'>
                                                        <p>${data["imdbRating"]}</p>
                                                        <p>${data["Metascore"]}</p>
                                                </div>
                                        `
                                        movieSection.innerHTML = movieCard
                                })     
                

        
                        }  
                })
        }


        
}