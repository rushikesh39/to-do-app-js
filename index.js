
let card1 = document.getElementById("box1");
let body = document.querySelector("body");
let card = document.createElement("div");

card.innerHTML = ` <div class="card1" id="box1">
<span class="c1">Add New List</span>
<input type="text" class="inp"  id="inputtext"/> <span  id="99">
<button id="b98" onclick= 'addbranch()'>Add</button> <button id="b97" onclick="cloceme()">Close</button> </span>
</div> `;

function callme() {
  body.appendChild(card);
  card.style.display = "block";
  const backButton = document.querySelector('#back')
  backButton.style.display = 'none'
}
function cloceme() {
  card.style.display = "none";
  let c1= document.getElementById("popup2")
  c1.style.display = "none";
}

let data = [];
let cardId;


function addbranch() {
  let inputtext = document.getElementById("inputtext").value;
  let item = {
    id: new Date().getTime(),
    title: inputtext,
    content : [],
  };

  console.log(inputtext);
  if (inputtext) {
   
    data.push(item);
    arraydata();
    // console.log(item);
    // console.log(data);
  } else {
   
    alert(" Please Add Titel ");
  }
  document.getElementById("inputtext").value = "";
  cloceme();
  const cardHeading = document.querySelector('.cardHeading');
 cardHeading.innerHTML = "";
}
function renderContent(){

  for(i=0;i<data.length;i++){
    const ulElemnt = document.getElementById(`content-list-${data[i].id}`);
    let child ="";
  for ( j = 0;j < data[i].content.length; j++ ){
    let content = data[i].content[j];
     child += `<li class = "content ${content.done? "checked":""}" id = "${content.id}" onclick ="doneTask(${content.id}, ${data[i].id})">${content.contentText}</li>`
  }
  ulElemnt.innerHTML = child;

}

}

function arraydata() {
  const cardcontainer = document.querySelector("#card-container");
  let child = "";
  for (let i = 0; i<data.length; i++) {
    // console.log("data[i]:", data[i]);
    // console.log(data[i].title);
    child += `<div class="branchcard" id ='${data[i].id}'
    > 
    <h2 class="heading" value="${data[i].title}" 
    onclick ="displayMyCard(${data[i].id}, this.getAttribute('value'))">${data[i].title}   
    </h2>
     <hr> 
     <ul id = "content-list-${data[i].id}">
     
     </ul>

    <div class ="end2btn"> 
    <button onclick="DeleteCard(${data[i].id})">delete</button> 
    <button onclick="showAddContentPopup(${data[i].id})">Add</button></div></div>`;
  }
  
  cardcontainer.innerHTML = child;
  renderContent()
  const navBar = document.querySelector('#head')
  navBar.style.display = 'block'

}



function DeleteCard(id){
  const cardcontainer = document.getElementById("card-container");
const cdel2 = `${id}`;
const card =document.getElementById(cdel2);
// console.log(card);
card.parentNode.removeChild(card);
data = data.filter(item => item.id != id);
 backToAll()
// console.log(id);



}

function showAddContentPopup(id){
  console.log(id);
 const popup2 = document.getElementById("popup2")
  popup2.style.display = "flex";
  cardId = id
  // console.log(cardId);
}

function AddContentToCard() {
  const contentListId = `content-list-${cardId}`;
  console.log(contentListId);
  const Ul = document.getElementById(contentListId);
  const contentText = document.getElementById('inputtext2').value;
  console.log(contentText);
  if (!contentText) {
      alert("Please add task name");
  } else {         
    document.getElementById('inputtext2').value = "";
    const liNode = document.createElement("li");

    liNode.innerHTML = contentText;
    liNode.className = "content";
    Ul.appendChild(liNode);

    cloceme()
    
    for(i=0;i<data.length;i++){

      if(data[i].id==cardId){
        const  content = {
          id: new Date().getTime(),
          contentText: contentText,
          done : false,
        } 
        data[i].content.push(content)
      }
    }
    console.log(data);
    renderContent()
}

} 
function doneTask(taskId, cardId) {

  
  const contentId = `${taskId}`
  const liElement = document.getElementById(contentId);
  liElement.classList.toggle("checked");

  for (let i=0;i<data.length;i++){
      if (data[i].id ==cardId){
        
          for (let j=0;j<data[i].content.length;j++){
              const content = data[i].content[j];
              if(content.id == taskId){
                  data[i].content[j].done = !data[i].content[j].done ;
                  // data[i].content[j].done = true;
              }
          }
      }
  }
 
}
function displayMyCard(id, value){
    console.log("js");
    console.log("id" , id);
    const addbtn1 = document.getElementById("addbtn1")
  addbtn1.style.display = "block";

  const cardHeading = document.querySelector('.cardHeading');
  cardHeading.innerHTML = value;

  const cards = document.querySelectorAll('.branchcard')
  cards.forEach(allcards => {
      allcards.style.display ='none';
  });
  const cardToShow = document.getElementById(id);
  cardToShow.style.display = 'block'


  const navBar = document.querySelector('#head')
  navBar.style.display = 'none'

  const backButton = document.querySelector('#back')
  backButton.style.display = 'block'
}


function backToAll(){
  const cards = document.querySelectorAll('.branchcard');
  const cardHeading = document.querySelector('.cardHeading');
 cardHeading.innerHTML = "";
  cards.forEach(allcards => {
      allcards.style.display ='block';
  });
  const navBar = document.querySelector('#head')
  navBar.style.display = 'block'

  const backButton = document.querySelector('#back')
  backButton.style.display = 'none'

}


