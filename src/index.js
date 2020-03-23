import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css'
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import fetchImages from './js/fetchImages';
import createMarkup from './js/createMarkup';
import * as basicLightbox from 'basiclightbox'
import PNotify from '../node_modules/pnotify/dist/es/PNotify'
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons';


const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let query;
let counter = 0;


form.addEventListener('submit', handleFormSubmit);
loadMore.addEventListener('click', handleMoreClick);
gallery.addEventListener('click', handleGalleryClick);


function handleFormSubmit(e){
    e.preventDefault();
    if(input.value === ''){
        PNotify.error({
            text: "Please specify your request!"
          });
        return;
    }
    counter = +1;
    gallery.innerHTML = '';
    query = input.value;
    fetchImages(query, counter).then(data =>{
        if(data.hits.length === 0){
            PNotify.error({
                text: "There is no matches with your request! Please try another word."
              });
              loadMore.classList.add('none');
              return;
        }
        console.log(query);
        console.log(data);
        gallery.insertAdjacentHTML('beforeend', data.hits.map(hit=>createMarkup(hit)).join(''));
        PNotify.success({
            text: "You have found some cool images!"
          });
          loadMore.classList.remove('none');
    });
    input.value = '';
}



function handleMoreClick(){
    counter++;
    fetchImages(query, counter).then(data => {
        gallery.insertAdjacentHTML('beforeend', data.hits.map(hit=>createMarkup(hit)).join(''));
    });
}


function handleGalleryClick(e){
    const item = e.target;
    if(item === e.currentTarget){
        return;
    }
    if(document.querySelector('.photo-card')){
        console.log(item.closest('div'));
        const instance = basicLightbox.create(`
        <img src="${item.closest('div').dataset.big}" width="800" height="600">
    `)
    instance.show();
    }
}