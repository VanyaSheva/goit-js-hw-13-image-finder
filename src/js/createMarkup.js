export default function createMarkup(hit){
 return `
    <div class="photo-card" data-big='${hit.largeImageURL}'>
    <img src="${hit.webformatURL}" alt="image"/>
    <ul class='stats'>
      <li class="stats-item">
        <i class="material-icons">thumb_up</i>
        ${hit.likes}
      </li>
      <li class="stats-item">
        <i class="material-icons">visibility</i>
        ${hit.views}
      </li>
      <li class="stats-item">
        <i class="material-icons">comment</i>
        ${hit.comments}
      </li>
      <li class="stats-item">
        <i class="material-icons">cloud_download</i>
        ${hit.downloads}
      </li>
    </ul>
  </div> `
}