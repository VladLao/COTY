const $wrapper = document.querySelector('[data-wrapper]');
const $addButton = document.querySelector('[data-add_button]');
const $modal = document.querySelector('[data-modal]');
const $spinner = document.querySelector('[data-spinner]')
const $closeButton = document.querySelector('[data-close_button]');

const api = new Api('vladlao')

const gerenationCatCard = (cat) => `<div data-card_id=${cat.id} class="card mx-2" style="width: 18rem;">
<img src="${cat.image}" class="card-img-top" alt="${cat.name}">
<div class="card-body">
  <h5 class="card-title">${cat.name}</h5>
  <p class="card-text">${cat.description}</p>
  <button data-action="show" class="btn btn-primary">Show</button>
  <button data-action="delete" class="btn btn-danger">Delete</button>
  <button data-action="edit" class="btn btn-warning">Edit</button>
</div>
</div>`

const showModalCat = (
  cat
) => `<div data-card-show class="card__show">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${cat.image}" class="img_card_show" alt="${cat.name}">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h3 class="card-title mt-2">${cat.name}</h3>
      <p class="card-text text-center p-3">${cat.description}</p>
    </div>
  </div>
</div>
</div>`;

$wrapper.addEventListener('click', (event) => {
  switch (event.target.dataset.action) {
    case 'delete':
      const $currentCard = event.target.closest("[data-card_id]");
      const catId = $currentCard.dataset.card_id;
      api.delCat(catId);
      $currentCard.remove()
      break;

    case "edit":
        
  
     break;
    
    
    
    case "show":
        
  
     break;
  }
})

document.forms.catsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target).entries());

  data.age = Number(data.age)
  data.id = Number(data.id)
  data.rate = Number(data.rate)
  data.favorite = data.favorite === 'on'

  console.log(data);

  api.addCat(data).then(res => res.ok && $modal.classList.add('hidden'))
  
})

$addButton.addEventListener('click', () => {
  $modal.classList.remove('hidden')
})

$closeButton.addEventListener('click', () => {
  $modal.classList.add('hidden')
  console.log("закрыл на кнопку close");
})

window.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    $modal.classList.add('hidden') 
    console.log("закрыл на esc даже если он не был открыт")
  }
}

window.onclick = (e) => {
  if (e.target == $modal) {
      $modal.classList.add('hidden')
      console.log("закрыл кликом мимо")
  }        
}

api.getCats()
  .then((responce) => {
    return responce.json()
  })
  .then((data) => {
    setTimeout(() => {
      $spinner.classList.add('hidden')
      data.forEach(cat => {
        $wrapper.insertAdjacentHTML('beforeend', gerenationCatCard(cat))
      })
    }, 2000);
  });



//TODO: после добавления кота через форму, делать новый запрос на бэк и обновлять список котов
//TODO: добавить форму редактирования
//TODO: чистить форму если человек ее закрыл сам
