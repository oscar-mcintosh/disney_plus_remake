import { fetchCompanyAPIData, showSpinner, hideSpinner } from './config.js';
import { displayBackgroundImage2 } from './background.js';

class MovieUI {
  constructor(config) {
    this.id = null;
    this.title = null;
    this.posterPath = null;
    this.releaseDate = null;
    this.config = config;
  }


  async fetchMovieData() {
    try {
      const { slice, position, bgPosition, selector4 } = this.config;
      const { results } = await fetchCompanyAPIData(this.config.company);
      const show = results.slice(slice)[position];
      displayBackgroundImage2(selector4, 'movie', show.backdrop_path, bgPosition);

      const content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = `
        <h1 id="title">${show.title}</h1>
        <p>${show.overview}</p>
        <div class="details">
          <h6>A Disney Original</h6>
          <h4>${show.release_date.slice(0, 4)}</h4>
          <h3 id="rate"><span>IMDB</span><i class="ri-star-fill"></i>${show.vote_average}</h3>
        </div>
        <div class="btns">
          <a href="movie-details.html?id=${show.id}" id="play">View <i class="ri-play-fill"></i></a>
        </div>
      `;

      const container = document.querySelector(this.config.selector3);
      container.appendChild(content);

      this.populateCards(results, this.config.selector);
      this.populateSearchResults(results, this.config.selector2);

    } catch (error) {
    }

    this.setupSearchInput();
  }
  setupSearchInput() {
    const { selector2, searchInputSelector } = this.config;
    const search = document.querySelector(selector2);
    const searchInput = document.querySelector(searchInputSelector);
    if (searchInput) {
      searchInput.addEventListener('keyup', () => {
        let filter = searchInput.value.toUpperCase();
        let a = search.getElementsByTagName('a');
    
        for (let index = 0; index < a.length; index++) {
          let b = a[index].getElementsByClassName('cont')[0];
          let textValue = b.textContent || b.innerText;
    
          if (textValue.toUpperCase().indexOf(filter) > -1) {
            a[index].style.display = 'flex';
            search.style.visibility = 'visible';
            search.style.opacity = 1;
          } else {
            a[index].style.display = 'none';
          }
          if (searchInput.value.length === 0) {
            search.style.visibility = 'hidden';
            search.style.opacity = 0;
          }
        }
      });
    }
    
  }

  populateCards(results, selector) {
    results.forEach((movie) => {
      const div = document.createElement('a');
      div.classList.add('card');
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="poster" />
          <div class="rest_card">
            <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="" />
            <div class="cont">
              <h4>${movie.title}</h4>
              <div class="sub">
                <p>Family, ${movie.release_date}</p>
                <h3><span>IMDB</span><i class="ri-star-fill"></i>9.6</h3>
              </div>
            </div>
          </div>
        </a>
      `;
      const container = document.querySelector(selector);
      container.appendChild(div);
    });
  }

  populateSearchResults(results, selector2) {
    results.forEach((search) => {
      const anchor = document.createElement('a');
      anchor.classList.add('card');
      anchor.innerHTML = `
        <a href="movie-details.html?id=${search.id}" class="card">
          <img src="https://image.tmdb.org/t/p/w500${search.poster_path}" alt="${search.title}" class="poster" />
          <div class="cont">
            <h3>${search.title}</h3>
            <p>Family,${search.release_date.slice(0, 4)}, <span>IMDB</span><i class="ri-star-fill"></i>${search.vote_average}</p>
          </div>
        </a>
      `;
      const container = document.querySelector(selector2);
      container.appendChild(anchor);
    });
  }

  setupScrollButtons() {
    const { leftButtonSelector, rightButtonSelector, selector5 } = this.config;
    const leftButtons = document.querySelectorAll(leftButtonSelector);
    const rightButtons = document.querySelectorAll(rightButtonSelector);
    const cardContainers = document.querySelectorAll(selector5);

    leftButtons.forEach((leftButton, index) => {
      leftButton.addEventListener('click', () => {
        cardContainers[index].scrollLeft -= 140;
      });
    });

    rightButtons.forEach((rightButton, index) => {
      rightButton.addEventListener('click', () => {
        cardContainers[index].scrollLeft += 140;
      });
    });
  }
}

const categories = [
  {
    selector: '#cards',
    searchInputSelector: '#search_input1',
    selector2: '#search1',
    selector3: '#header1',
    selector5: '.cards',
    leftButtonSelector: '.ri-arrow-left-s-line',
    rightButtonSelector: '.ri-arrow-right-s-line',
    selector4: '.header1',
    company: '2|3475|15935|6125',
    slice: '0, 1',
    position: '0',
    bgPosition: 'center',
  },
  {
    selector: '#cards2',
    searchInputSelector: '#search_input2',
    selector2: '#search2',
    selector3: '#header2',
    selector5: '.cards',
    leftButtonSelector: '.ri-arrow-left-s-line',
    rightButtonSelector: '.ri-arrow-right-s-line',
    selector4: '.header2',
    company: '420',
    slice: '0, 1',
    position: '2',
    bgPosition: 'center',
  },
  {
    selector: '#cards3',
    searchInputSelector: '#search_input3',
    selector2: '#search3',
    selector3: '#header3',
    selector5: '.cards',
    leftButtonSelector: '.ri-arrow-left-s-line',
    rightButtonSelector: '.ri-arrow-right-s-line',
    selector4: '.header3',
    company: '3',
    slice: '0, 1',
    position: '3',
    bgPosition: 'center',
  },
  {
    selector: '#cards4',
    searchInputSelector: '#search_input4',
    selector2: '#search4',
    selector3: '#header4',
    selector5: '.cards',
    leftButtonSelector: '.ri-arrow-left-s-line',
    rightButtonSelector: '.ri-arrow-right-s-line',
    selector4: '.header4',
    company: '1',
    slice: '0, 1',
    position: '2',
    bgPosition: 'center',
  },
  {
    selector: '#cards5',
    searchInputSelector: '#search_input5',
    selector2: '#search5',
    selector3: '#header5',
    selector5: '.cards',
    leftButtonSelector: '.ri-arrow-left-s-line',
    rightButtonSelector: '.ri-arrow-right-s-line',
    selector4: '.header5',
    company: '3164',
    slice: '0, 1',
    position: '1',
    bgPosition: 'center',
  },
];

const categoryInstances = categories.map((config) => new MovieUI(config));
categoryInstances.forEach((instance) => {
  instance.fetchMovieData();
  instance.setupScrollButtons();
});
