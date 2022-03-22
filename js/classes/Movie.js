export { Movie }

class Movie {

        constructor() {
                this.key = "f6e256e1"
        }

        //search movies by title and displays it in the DOM 
        displayMovies(value, moviesSection, page) {

                document.querySelector('#error-msg').classList.add("hidden")

                let articles = ""

                if (value.length >= 3) {
                        
                        let query = `http://www.omdbapi.com/?s=${value}&type=movie&page=${page}&apikey=${this.key}`
                        fetch(query)
                        .then(function(response) {
                                if (response.ok) {
                                        
                                        response.json().then(function(data) {
                                                
                                                sessionStorage.setItem("value", value)
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
                                                <figure>
                                                <img src=${poster} alt="${movie["Title"]} poster"></img>
                                                
                                                <figcaption>${movie['Title']}</figcaption>
                                                </figure>
                                                
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
                } else {
                        document.querySelector('#error-msg').classList.remove("hidden")
                }
                
        }

        //search a movie by its ID and display its card
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

                                        movieCard = `
                                                <img src="${poster}"></img>
                                                <div>
                                                        <h2>${data["Title"]}</h2>
                                                        <div id='ratings'>
                                                        <div>
                                                        <img src="./public/img/imdb-logo.png"></img>
                                                        <p>${data["imdbRating"]}</p>
                                                        </div>
                                                        <div>
                                                        <img src="./public/img/metacritic-logo.png"></img>
                                                        <p>${data["Metascore"]}</p>
                                                        </div>
                                                        </div>
                                                        <div id="infos">
                                                        <p><span class="underlined_and_bold">genre:</span> ${data["Genre"]}</p>
                                                        <p><span class="underlined_and_bold">date de sortie:</span>${data["Released"]}</p>
                                                        </div>
                                                        <div id="synopsis">
                                                        <p><span class="underlined_and_bold">Synopsis:</span> ${data["Plot"]}</p>
                                                        </div>
                                                </div>
                                                `
                                        movieSection.innerHTML = movieCard
                                })     
        
                        }  
                })
        }
        
}