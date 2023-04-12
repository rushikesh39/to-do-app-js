let data = []
let cardId;

let popup = document.getElementsByClassName("popup-container");
let add = document.getElementById("add");
let blur = document.getElementsByClassName("main");

add.addEventListener("click", () => {
  console.log("plus button run succesful");
  popup[0].setAttribute("style", "display:flex");
  blur[0].classList.add("blur");
});
const addbtn = document.querySelector("#addbtn");
const closebtn = document.querySelector("#closebtn");

addbtn.addEventListener("click", () => {
  popup[0].setAttribute("style", "display:none");
  blur[0].classList.remove("blur");
});
function closeAddCardPopup() {
  popup[0].setAttribute("style", "display:none");
  blur[0].classList.remove("blur");
}
function deleteCard(id) {
  const cardcontainer = document.getElementById("card-container");
  const cardId = `card_${id}`;
  const card = document.getElementById(cardId);
  //remove child from parent node
  card.parentNode.removeChild(card);
  data = data.filter((item) => item.id != id);
}

function showAddContentToCardPopup(id) {
  blur[0].classList.add("blur");
  const popup2 = document.getElementById("popup2");
  popup2.style.display = "flex";
  cardId = id;
}

let addtext = document.getElementById("addtext");
const cardContainer = document.querySelector("#card-container");

function handleAddCard() {
  const cardText = document.getElementById("addtext").value;
  const card = {
    id: new Date().getTime().toString(),
    cardTitle: cardText,
    content: [],
  };
  if (cardText) {
    data.push(card);
    renderCards();
  } else {
    alert("Please add card Name");
  }
  document.getElementById("addtext").value = "";
  closeAddCardPopup();
}
function renderContent() {
  for (let i = 0; i < data.length; i++) {
    const ulElement = document.getElementById(`content_list_${data[i].id}`);
    let child = "";
    for (let j = 0; j < data[i].content.length; j++) {
      const content = data[i].content[j];
      console.log(content.id, "content id");
      child += `<li class="${content.done ? 'checked':''}" id="content_${content.id}" onclick="doneTask(${content.id},${data[i].id}">${content.contentText}</li>`;
    }
    ulElement.innerHTML = child;
  }
}
function renderCards() {
  const cardcontainer = document.getElementById("card-container");
  let child = "";
  for (let i = 0; i < data.length; i++) {
    console.log("data[i]:", data[i]);
    child += `<div id="card_${data[i].id}" class="card">
        <h3 class="p2">${data[i].cardTitle}</h3>
        <hr>
        <div class="ul">
          <ul  id="content_list_${data[i].id}">

          </ul>
        </div>
        <div class="container2">
        <Button onclick="deleteCard(${data[i].id})" class="delete">Delete</Button>
        <Button onclick="showAddContentToCardPopup(${data[i].id})" class="add">Add</Button>
        </div>
        </div>`;
  }
  cardcontainer.innerHTML = child;
  renderContent();
}

function removeAddContentToCardPopup() {
  blur[0].classList.remove("blur");
  const popup2 = document.getElementById("popup2");
  popup2.style.display = "none";
}

function addContentToCard() {
  const contentListId = `content_list_${cardId}`;
  const Ul = document.getElementById(contentListId);
  const contentText = document.getElementById("card-content-input").value;
  if (!contentText) {
    alert("Please add task name");
  } else {
    document.getElementById("card-content-input").value = "";
    const liNode = document.createElement("li");
    const listId = new Date().getTime().toString();
    liNode.innerHTML = contentText;
    liNode.className = ""; //design list
    liNode.id = `content_${listId}`;
    liNode.onclick = function () {
      doneTask(listId, cardId);
    };
    Ul.appendChild(liNode);
    removeAddContentToCardPopup();
    for (let i = 0; i < data.length; i++) {
      // console.log("inside for loop")
      console.log("data id", data[i].id, "cardId", cardId);
      if (data[i].id == cardId) {
        // console.log("inside if condition");
        let content = {
          id: new Date().getTime().toString(),
          contentText: contentText,
          done: false,
        };
        data[i].content.push(content);
      }
    }
  }
}
function doneTask(listId, cardId) {
  const contentId = `content_${listId}`;
  const liElement = document.getElementById(contentId);
  liElement.classList.toggle("checked");

  for (let i = 0; i < data.length; i++) {
    if (data[i].id == cardId) {
      for (let j = 0; j < data[i].content.length; j++) {
        const content = data[i].content[j];
        console.log(data[i].content[j].id, "jdofnnasoi",listId);
        if (content.id == listId) {
          console.log("if condition");
          data[i].content[j].done = true;
        }
      }
    }
  }
  console.log(data);
}
