import { Movie } from './classes/Movie.js'

let movieId = window.location.search.substring(1)

let movieSection = document.querySelector('#movie_card')

let movie = new Movie()


window.addEventListener("load", movie.displayMovieDetail(movieId, movieSection))