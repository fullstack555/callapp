let addnote = document.querySelector("#addnote");
let formcontainer = document.querySelector(".form-container");

const form = document.querySelector("form");
const imgurlInput = form.querySelector("input[placeholder = 'https://example.com/photo.jpg']"

);
const fullnameInput = form.querySelector("input[placeholder = 'Enter full name']"

);
const hometownInput = form.querySelector("input[placeholder = 'Enter home town']"

);
const purposeInput = form.querySelector("input[placeholder = 'e.g., Quick appointment note']"

);
const categoryradio = form.querySelectorAll("input[name='category']"

);
const submitbtn = form.querySelector(".submit-btn");

const stack = document.querySelector(".stack");
const upbtn = document.querySelector("#upbtn");
const downbtn = document.querySelector("#downbtn");

function saveToLocalStorage(obj) {
    if(localStorage.getItem("tasks") === null){
        let oldtask = [];
        oldtask.push(obj);
        localStorage.setItem("tasks",JSON.stringify(oldtask));
    }
    else{
       let oldtask =  localStorage.getItem("tasks");
       oldtask = JSON.parse(oldtask);
       oldtask.push(obj);
       localStorage.setItem("tasks",JSON.stringify(oldtask));

    }
}

addnote.addEventListener("click",function () {
    formcontainer.style.display = "initial"; 
});

let closeform = document.querySelector(".closeForm");
closeform.addEventListener("click",function(){
    formcontainer.style.display = "none";
});

form.addEventListener("submit",function(evt){
    evt.preventDefault();

    const imgurl = imgurlInput.value.trim();
    const fullname = fullnameInput.value.trim();
    const hometown = hometownInput.value.trim();
    const purpose = purposeInput.value.trim();

    let selected = "false";
    categoryradio.forEach(function(cat) {
        if(cat.checked){
            selected = cat.value;
        }
    });

    if(imgurl === ""){
        alert("please enter an image url");
        return;
    }
    if(fullname === ""){
        alert("please enter your full name");
        return;
    }
    if(hometown === ""){
        alert("please enter your home town");
        return;
    }
    if(purpose === ""){
        alert("please enter the purpose of the note");
        return;
    }
    if(selected === "false"){
        alert("please select a category");
        return;
    }
    saveToLocalStorage({
        imgurl,
        fullname,
        hometown,
        purpose,
        selected,
    });
    form.reset();
    formcontainer.style.display = "none";
});

function showcards() {
    let alltasks = JSON.parse(localStorage.getItem("tasks"));
    alltasks.forEach(function(task){

    const card = document.createElement("div");
    card.classList.add("card");

    const avatar = document.createElement("img");
    avatar.src = task.imgurl;
    avatar.alt = "picture";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    const name = document.createElement("h2");
    name.textContent = task.fullname;
    card.appendChild(name);
    
    const hometowninfo = document.createElement("div");
    hometowninfo.classList.add("info");

    const hometownlabel = document.createElement("span");
    hometownlabel.textContent = "Hometown: ";

    const hometownvalue = document.createElement("span");
    hometownvalue.textContent = task.hometown;
    
    hometowninfo.appendChild(hometownlabel);
    hometowninfo.appendChild(hometownvalue);
    card.appendChild(hometowninfo);

    const bookinginfo = document.createElement("div");
    bookinginfo.classList.add("info");

    const bookinglabel = document.createElement("span");
    bookinglabel.textContent = "Purpose: ";

    const bookingvalue = document.createElement("span");
    bookingvalue.textContent = task.purpose;

    bookinginfo.appendChild(bookinglabel);
    bookinginfo.appendChild(bookingvalue);
    card.appendChild(bookinginfo);

    const buttondiv = document.createElement("div");
    buttondiv.classList.add("buttons");

    const callbutton = document.createElement("button");
    callbutton.classList.add("call");
    callbutton.innerHTML = `<i class="ri-phone-line"></i>`;

    const msgbtn = document.createElement("button");
    msgbtn.classList.add("msg");
    msgbtn.textContent = "message";

    buttondiv.appendChild(callbutton);
    buttondiv.appendChild(msgbtn);

    card.appendChild(buttondiv);

    document.querySelector(".stack").appendChild(card);
    });
}
showcards();

function updatestack(){
    let cards = document.querySelectorAll(".stack .card");
    for(let i = 0; i<3; i++){
    card.style.zIndex = 3 -  index;
    card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
    card.style.opacity = `${1 - index * 0.2}`;
    };
}

upBtn.addEventListener("click",function(){
    let lastchild = stack.lastElementChild;
    if(lastchild){
        stack.insertBefore(lastchild,stack.firstElementChild);

    updatestack();
    }    
});

downBtn.addEventListener("click",function(){
    let firstchild = stack.firstElementChild;
    if(firstchild){
        stack.appendChild(firstchild);

        updatestack();
    }

});
