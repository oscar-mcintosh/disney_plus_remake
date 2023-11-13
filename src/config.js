
import dotenv from 'dotenv';
dotenv.config();

const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        company: '',
        page: 1,
        totalPages: 1,
        totalResults: 0
    },
    api: {
        apiKey: '32f125384ff65ff548dd2e4dd374775a',
        apiUrl: 'https://api.themoviedb.org/3/'
    }
};
const apiKey = process.env.APP_API_KEY;
const apiUrl = process.env.APP_API_URL;
const API_KEY = global.api.apiKey;
const API_URL = global.api.apiUrl;

const fetchAPIData = async (endpoint) => {
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    hideSpinner();
    return response.json();
};

const fetchCompanyAPIData = async (company) => {
    const response = await fetch(`${API_URL}discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=${company}`);
    return response.json();
};

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show');
};

const similarAPIData = async (movie) => {
    showSpinner();
    const response = await fetch(`${API_URL}movie/${movie}/similar?api_key=${API_KEY}&language=en-US`);
    hideSpinner();
    return response.json();
};

const trailorAPIData = async (movie) => {
    showSpinner();
    const response = await fetch(`${API_URL}movie/${movie}/videos?api_key=${API_KEY}&language=en-US`);
    hideSpinner();
    return response.json();
};

const castAPIData = async (movie) => {
    showSpinner();
    const response = await fetch(`${API_URL}movie/${movie}/credits?api_key=${API_KEY}&language=en-US`);
    hideSpinner();
    return response.json();
};

const reviewsAPIData = async (movie) => {
    showSpinner();
    const response = await fetch(`${API_URL}movie/${movie}/reviews?api_key=${API_KEY}&language=en-US`);
    hideSpinner();
    return response.json();
};

const displayPagination = () => {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `;
    document.querySelector('#pagination').appendChild(div);

    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');

    prevButton.disabled = global.search.page === 1;
    nextButton.disabled = global.search.page === global.search.totalPages;

    nextButton.addEventListener('click', async () => {
        global.search.page++;
        const { results, total_pages } = await fetchCompanyAPIData();
        displaySearchResults(results);
    });

    prevButton.addEventListener('click', async () => {
        global.search.page--;
        const { results, total_pages } = await fetchAPIData();
        displaySearchResults(results);
    });
};

export {
    global,
    fetchCompanyAPIData,
    fetchAPIData,
    showSpinner,
    hideSpinner,
    similarAPIData,
    trailorAPIData,
    castAPIData,
    reviewsAPIData,
    displayPagination
};
