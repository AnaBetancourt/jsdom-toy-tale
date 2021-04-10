let addToy = false;
let likeBtns = []
const toyFormContainer = document.querySelector(".container");
const form = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn")
  form.addEventListener('submit', getNewToy)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(createToyCards)
}

function createCard(toy){
  const cardContainer = document.getElementById('toy-collection')
  const card = document.createElement('div')
  card.classList.add("card")
  card.dataset.id = toy.id

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  card.append(toyName)

  const toyImg = document.createElement('img')
  toyImg.classList.add("toy-avatar")
  toyImg.src = toy.image
  card.append(toyImg)

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes`
  card.append(toyLikes)

  const likeBtn = document.createElement('button')
  likeBtn.classList.add("like-btn")
  likeBtn.innerText = "Like <3"
  card.append(likeBtn)

  cardContainer.appendChild(card)
  form.reset()
  toyFormContainer.style.display = "none"

  likeBtns = document.querySelectorAll('.like-btn')
  likeBtns.forEach(btn => {
    btn.addEventListener('click', addLike)
  })
}

function createToyCards(json){
  const toyList = json
  toyList.forEach(toy => createCard(toy))
}

function getNewToy(event){
  event.preventDefault()
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value, 
      image: event.target.image.value, 
      likes: 0
    })
  }
  fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(createCard)
}

function addLike(event){
  event.preventDefault()
  const id = event.target.parentElement.dataset.id
  // console.log(event)
  // debugger
  const configObj2 = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(event.target.parentElement.children[2].innerText) + 1
    })
  }
  fetch(`http://localhost:3000/toys/${id}`, configObj2)
  .then(resp => resp.json())
  .then(json => {
    const strId = JSON.stringify(id)
    const cards = document.getElementsByClassName('card')
    console.log(json)
    console.log(strId)
    console.log(cards)
    debugger
  })
}