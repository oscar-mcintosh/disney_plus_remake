import { fetchCompanyAPIData, displayPagination } from './config'


class PageUi {
    constructor(selector, selector2, selector3, company, video ) {
        this.id = null;
        this.title = null;
        this.posterPath = null;
        this.releaseDate = null;
        this.selector = selector;
        this.selector2 = selector2;
        this.selector3 = selector3;
        this.company = company; 
        this.video = video; 

    }

    async fetchCompanyData() {
        try {
            const { results } = await fetchCompanyAPIData(this.company);
            const nav = document.createElement('div');
            nav.classList.add('container');
            nav.innerHTML = `
            <div class="back">
                <a class="btn" href="../dist/index.html">Back To Home</a>
            </div>
    
            <nav>
                <ul>
                <li>
                    <a class="nav-link" href="#crew">Cast</a>
                </li>
                <li>
                    <a class="nav-link" href="#review">Reviews</a>
                </li>
                <li>
                    <a class="nav-link" href="#similar">Similar Movies</a>
                </li>
    
                </ul>
            </nav>  
            `;
            const header = document.querySelector(this.selector3);
            header.appendChild(nav);
            const div = document.createElement('div');
            div.classList.add('head__cover');
            div.innerHTML = `
              <video style="width: 100%; height: 100%; object-fit: cover;" autoplay muted loop>
                <source src="${this.video}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            `;

            const container = document.querySelector(this.selector2);
            container.appendChild(div);


            results.forEach(movie => {
                const div = document.createElement('div');
                div.classList.add('card');
                div.innerHTML = `
                <div class="card-img">
                    <a href="movie-details.html?id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"  />
                    </a>
                    </div>
                    <div class="card__info">
                        <h3><a href="movie-details.html?id=${movie.id}" title="">${movie.title}</a></h3>
                        <small class="text-muted">Aired: ${movie.release_date}</small>
                    </div>
                `;
                const container = document.querySelector(this.selector);
                container.appendChild(div);
            });
            displayPagination();

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

const disneyPage = new PageUi("#disney-shows", '#disney-cover','#main-header1', '2|3475|15935|6125', '../dist/assets/videos/disney.mp4',); 
const marvelPage = new PageUi("#marvel-shows", '#marvel-cover',  '#main-header2', '420', '../dist/assets/videos/marvel.mp4', );
const pixarPage = new PageUi("#pixar-shows", '#pixar-cover', '#main-header4', '3', '../dist/assets/videos/pixar.mp4',);
const starwarsPage = new PageUi("#starwars-shows", '#starwars-cover',  '#main-header5', '1', '../dist/assets/videos/star-war.mp4', );
const natgeoPage = new PageUi("#natgeo-shows", '#natgeo-cover',  '#main-header3', '3164', '../dist/assets/videos/geographic.mp4',);

export { disneyPage, marvelPage, pixarPage, starwarsPage, natgeoPage }