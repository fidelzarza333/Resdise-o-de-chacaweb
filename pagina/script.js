console.log("tumadre")

const buttons1 = document.querySelectorAll(".tab-group button[data-tab]");
const contents = document.querySelectorAll(".tab-panel");

buttons1.forEach(button => {
    button.addEventListener("click", () =>{
        buttons1.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        contents.forEach(c => c.classList.remove("active"));

        const tab = button.getAttribute("data-tab");

        document.getElementById(tab).classList.add("active");
    });
});



//Next



const buttons2 = document.querySelectorAll(".btn-container button[data-tab]");
console.log(buttons2);
const tablas = document.querySelectorAll(".tabla");

buttons2.forEach(button => {
    button.addEventListener("click", () =>{
        buttons2.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
    
        tablas.forEach(t => t.classList.remove("active"));

        const tab = button.getAttribute("data-tab");

        document.getElementById(tab).classList.add("active")
    });
});


//carousel


const wrappers = document.querySelectorAll(".wrapper");
const btnPrev = document.querySelector(".botones button:first-child");
const btnNext = document.querySelector(".botones button:last-child");

let index = 2;

function updateCarousel(){
    wrappers.forEach(w => w.classList.remove("active"));
    wrappers[index].classList.add("active");
    console.log(index)
}

btnNext.addEventListener("click", () =>{
    index ++;

    if(index > wrappers.length-1){
        index = 0;
    }

    updateCarousel();
})

btnPrev.addEventListener("click", () =>{
    index --;

    if(index < 0){
        index = wrappers.length-1
    }

    updateCarousel();
})
