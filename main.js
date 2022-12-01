let $box = document.querySelector("#box");
let $form = document.getElementById("form");
let $elGenre = document.getElementsByName("genre")[0];

function renderGenres(array, element){
    let genres = [];
    array.forEach(film => {
        film.genres.forEach(genre => {
            if(!genres.includes(genre)){
                genres.push(genre);
            };
        });
    });
    
    if(!genres){ return null}
    
    let newOption = ''
    genres.forEach(item => {
        value = item.split(" ").join("*");
        newOption += `<option value="${value}">${item}</option>`;
    })
    
    element.innerHTML += newOption;
}
renderGenres(films, $elGenre);

$form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let {search, genre, sort} = evt.target.elements;
    
    let regex = new RegExp(search.value.trim(), "gi");
    
    let filteredFilms = films.filter((film) => film.Title.match(regex));
    
    let genreFilteredFilms = [];
    if(genre.value === "all"){
        genreFilteredFilms = filteredFilms
    }else{
        genreFilteredFilms = filteredFilms.filter(film => film.genres.includes(genre.value));
    }
    
    if(sort.value === "a-z"){
        genreFilteredFilms.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1);
    }else{
        genreFilteredFilms.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? -1 : 1);
    }
    console.log(genreFilteredFilms);
    renderFilms(genreFilteredFilms, $box);
});

function renderFilms(array, element) {
    element.innerHTML = null;
    let newLi = "";
    
    array.forEach((film) => {
        newLi += `
        <li style="width: 400px;">
        <img src='${film.Poster}' width="380" alt="sjhas" >
        <h2>${film.Title}</h2>
        <p>${film.id}</p>
        <a href='${film.link}'>See video</a>
        </li>
        `;
    });
    element.innerHTML = newLi;
}
renderFilms(films, $box);
