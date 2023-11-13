import { fetchCompanyAPIData, showSpinner, hideSpinner, similarAPIData, fetchAPIData, trailorAPIData, castAPIData, reviewsAPIData  } from './config'
import { displayBackgroundImage2 } from './background'

const addComasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


const displayMovieDetails = async () => {
    const movieId = window.location.search.split('=')[1];
    const { results } = await similarAPIData(movieId);

    const movie = await fetchAPIData(`movie/${movieId}`);

    const releaseDate = new Date(movie.release_date);
    const formattedDate = `${(releaseDate.getMonth() + 1).toString().padStart(2, '0')}-${releaseDate.getDate().toString().padStart(2, '0')}-${releaseDate.getFullYear()}`;

    displayBackgroundImage2('#details-hero', 'movie', movie.backdrop_path, 'left calc((50vw - 200px) - 400px) top' );
    similarAPIData(movieId);
    const trailor = await trailorAPIData(movieId);

   
    const clips = trailor.results.filter(clip => clip.name.includes("Trailer"));
    const url = `https://www.youtube.com/embed/${clips[0].key}`;
        const image = document.createElement('div');
        image.classList.add('card-img');
        image.innerHTML =
            ` 
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="image"/>
            `
        ;
        
        const div = document.createElement('div');
        div.classList.add('movie__details');
        div.innerHTML = `
            <h2>${movie.title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movie.vote_average.toFixed(1)} / 10
                </p>
                
                <p class="text-muted">Release Date: ${formattedDate}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres.map((genre) => 
                    `<li>${genre.name}</li>`).join('')}
                </ul>
            `
        const play = document.createElement('button');
        play.classList.add('play');
        play.innerHTML = `
            <i class="ri-play-line">
        `


        const iframe = document.createElement('div');
        iframe.classList.add('modal');
            iframe.innerHTML = `
            <div class="modal-content">
                <span class="close" id="closeButton">&times;</span>
                <iframe id="videoFrame" width="900" height="470" src="${url}" frameborder="0" allowfullscreen></iframe>
            </div>
        `
    results.forEach(movie => {   
        const div = document.createElement('a');
        div.classList.add('card');
            div.innerHTML = `
                <a href="movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="poster" />
                    <div class="rest_card">
                    
                        <div class="cont">
                            <h4>Loki</h4>
                            <div class="sub">
                                <p>Family, ${movie.release_date}</p>
                                <h3><span>IMDB</span><i class="ri-star-fill"></i>9.6</h3>
                            </div>
                        </div>
                    </div>
                </a>
            `
            ;
    });

    document.querySelector('#detail__poster').appendChild(image);
    document.querySelector('#content').appendChild(div);
    document.querySelector('#links').appendChild(play);
    document.querySelector('#details-hero').appendChild(iframe);

    const playButton = document.querySelector('.playButton');
    const closeButton = document.querySelector('.close');
    
    
    const openModal = () => {
      const modal = document.querySelector('.modal');
        if (modal) {
            modal.style.display = 'block';
            closeButton.style.display = 'block';
            playButton.style.display = 'none';
        }
    };
    const closeModal = () => {
      const modal = document.querySelector('.modal');
      if (modal) {
          modal.style.display = 'none';
          closeButton.style.display = 'none';
          playButton.style.display = 'block';
      }
    };
    playButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    

};


const similarMovies = async () => {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    const company = movie.production_companies[0].id;
    const releaseDate = new Date(movie.release_date);
    const formattedDate = `${(releaseDate.getMonth() + 1).toString().padStart(2, '0')}-${releaseDate.getDate().toString().padStart(2, '0')}-${releaseDate.getFullYear()}`;
    const { results } = await fetchCompanyAPIData(company);

    results.forEach(similarMovie => {
        if (similarMovie.id !== parseInt(movieId)) {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <div class="card__thumbnail">
                    <a href="movie-details.html?id=${similarMovie.id}" title="">
                            <img src="https://image.tmdb.org/t/p/w500${similarMovie.poster_path}" alt="${similarMovie.title}" class="card__img" />
                        <div class="card__time">${similarMovie.vote_average.toFixed(1)} / <span> 10</span></div>
                    </a>
                </div>
                <div class="card__info">
                    <h3><a href="movie-details.html?id=${similarMovie.id}" title="">${similarMovie.title}</a></h3>
                    <span><small class="card__date">${similarMovie.release_date}</small></span>
                </div>
            `;
            document.querySelector('#similar-movies').appendChild(div);
        }
    });
};

const movieCast = async () => {
    const movieId = window.location.search.split('=')[1];
    const { cast } = await castAPIData(movieId);
    const filteredCast = cast.filter(member => member.known_for_department.includes("Acting")).slice(0, 4);
    filteredCast.forEach(cast => {
            const article = document.createElement('article');
            article.classList.add('card__article');
            article.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${cast.profile_path}" alt="${cast.name}" class="card__img" />
                <div class="card__data">
                <h3 class="card__title">${cast.name}</a></h3>

                <span><small class="card__button">${cast.character}</small></span>

                </div>
            `;
            document.querySelector('#cast').appendChild(article);
    });
};

const movieReviews = async () => {
    const movieId = window.location.search.split('=')[1];
    const { results } = await reviewsAPIData(movieId);
    const reviews = results.slice(0, 3);

    reviews.forEach(review => {
            const article = document.createElement('article');
            article.classList.add('review__card');
            article.innerHTML = `
            <div class="review__img">
                <img src="https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}" alt="image" >
                </div>
                <h2 class="review__title">${review.author}</h2>
                <p class="review__description review">${review.content}</p>
                <div class="review__stars">
                <i class="ri-star-fill"></i>

                </div>

                </div>
            `;
            document.querySelector('#reviews').appendChild(article);
    });
};



export {displayMovieDetails, similarMovies, movieCast, movieReviews, }


