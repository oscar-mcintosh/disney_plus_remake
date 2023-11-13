import '../dist/assets/css/styles.css';
import { global, fetchCompanyAPIData, showSpinner, hideSpinner, similarAPIData } from './config'
import { displayMovieDetails, similarMovies, movieCast, movieReviews,  } from './details'
import { disneyUi, marvelUi, pixarUi, starwarsUi, natgeoUi, setupScrollButtons, disney } from './movies'
import { disneyPage, marvelPage, pixarPage, starwarsPage, natgeoPage } from './pages'



// Display backdrop on Details pages
// function displayBackgroundImage(type, backgroundPath) {
//     const overlayDiv = document.createElement('div');
//     overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
//     overlayDiv.style.backgroundSize= 'cover';
//     overlayDiv.style.backgroundPosition= 'left calc((50vw - 170px) - 340px) bottom';

//     overlayDiv.style.backgroundRepeat= 'no-repeat';
//     overlayDiv.style.height= '100vh';
//     overlayDiv.style.width= '100vw';
//     overlayDiv.style.position= 'absolute';
//     overlayDiv.style.top= '0';
//     overlayDiv.style.left= '0';
//     overlayDiv.style.zIndex= '-1';
//     overlayDiv.style.opacity= '0.1';

//     if (type === 'movie') {
//         document.querySelector('#movie-details').appendChild(overlayDiv);
//     }else {
//         document.querySelector('#show-details').appendChild(overlayDiv);
//     }
// }


// Active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    });
}

function addComasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}



// Init App
function init(){
    switch (global.currentPage) {
        case '/':
        case '/dist/index.html':
            console.log('Home');
            break;
        case '/dist/movie-details.html':
            displayMovieDetails();
            similarMovies();
            movieCast();
            movieReviews();
            break;
        case '/dist/disney.html':
            disneyPage.fetchCompanyData();
            break;
        case '/dist/pixar.html':
            pixarPage.fetchCompanyData();
            break;
        case '/dist/marvel.html':
            marvelPage.fetchCompanyData();
            break;
        case '/dist/starwars.html':
            starwarsPage.fetchCompanyData();
            break;
        case '/dist/natgeo.html':
            natgeoPage.fetchCompanyData();
            break;
    
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)