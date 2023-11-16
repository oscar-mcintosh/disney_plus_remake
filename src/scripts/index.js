import '../css/spinner.css';
import '../css/styles.css'
import disneyImg from '../assets/disney.png';
import { displayBackgroundImage2 } from './background.js';
import { global, fetchCompanyAPIData, showSpinner, hideSpinner, similarAPIData } from './config.js'
import { displayMovieDetails, similarMovies, movieCast, movieReviews,  } from './details.js'
import { disneyUi, marvelUi, pixarUi, starwarsUi, natgeoUi, setupScrollButtons, disney } from './movies.js'
import { disneyPage, marvelPage, pixarPage, starwarsPage, natgeoPage } from '../scripts/pages'

const disneyLogos = document.querySelectorAll('.disneyLogo');


disneyLogos.forEach((logo) => {
  logo.src = disneyImg;
});


// Active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    });
}


// Init App
function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            break;
        case '/movie-details.html':
            displayMovieDetails();
            similarMovies();
            movieCast();
            movieReviews();
            break;
        case '/disney.html':
        case '/disney':
            disneyPage.fetchCompanyData();
            break;
        case '/pixar.html':
        case '/pixar':
            pixarPage.fetchCompanyData();
            break;
        case '/marvel.html':
        case '/marvel':
            marvelPage.fetchCompanyData();
            break;
        case '/starwars.html':
        case '/starwars':
            starwarsPage.fetchCompanyData();
            break;
        case '/natgeo.html':
        case '/natgeo':
            natgeoPage.fetchCompanyData();
            break;    
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)