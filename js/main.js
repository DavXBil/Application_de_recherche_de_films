import { Movie } from './classes/Movie.js'

let inputTitle = document.querySelector("#title")
let moviesSection = document.querySelector("#movies")
let pagingSection = document.querySelector('#paging')
let searchButton = document.querySelector("#search_button")

let page = 1



let movie = new Movie()


searchButton.addEventListener('click', function() {

        movie.displayMovies(inputTitle.value, moviesSection, page)
})

pagingSection.addEventListener('click', function(e) {

        if(e.target.className == 'paginglink') {
                
                if (e.target.id == 'pageprevious') {
                        page = page - 1
                        console.log(page)
                } else if(e.target.id == "pagenext") {
                        page++
                        console.log(page)
                } else {
                        page = parseInt(e.target.textContent)
                }
                
                movie.displayMovies(e.target.getAttribute('name'), moviesSection, page)
        }
})

