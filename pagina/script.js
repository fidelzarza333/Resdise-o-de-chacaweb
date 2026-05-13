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


//Animaciones Scroll


const elementos = document.querySelectorAll(".scroll");

function checkScroll() {
  elementos.forEach(e => {
    const posicion = e.getBoundingClientRect();

    if(posicion.top < window.innerHeight-100  && posicion.bottom > 0){
      e.classList.add("mostrar");
    }
  })
}

//ahora se ejecuta cuando vas a esa seccion desde un link tambien
window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);



// navbar y que de desactive cuando apretes un link

document.addEventListener("click", (e) => {
    if (e.target.closest("#menuBtn")) {
        document.getElementById("nav").classList.toggle("active");
    }

    if (e.target.closest("#nav a")) {
        document.getElementById("nav").classList.remove("active");
    }
});


//Preguntas del FAQ

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item =>{
  
  const btn = item.querySelector(".faq-btn");
  const body = item.querySelector(".faq-body");

  btn.addEventListener("click", () => {
    item.classList.toggle("active");

    if(item.classList.contains("active")){
      body.style.maxHeight = body.scrollHeight + "px";
    }
    else{
      body.style.maxHeight = 0;
    }
  })
})


// cada vez que cambie la ventana de tamaño que se actualice

window.addEventListener('resize', () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item =>{
    const body = item.querySelector(".faq-body");
    if(item.classList.contains("active")){
        body.style.maxHeight = body.scrollHeight + "px";
      };
  })
});

//Next


function igualarFilas() {
  document.querySelectorAll('.tabla-grid').forEach(grid => {
    const categorias = grid.querySelectorAll('.categoria');
    let maxFilas = 0;

    // Encontrar el máximo de filas entre las categorías
    categorias.forEach(cat => {
      const cantidad = cat.querySelectorAll('.fila:not(.total)').length;
      if (cantidad > maxFilas) maxFilas = cantidad;
    });

    // Agregar filas vacías a las que tienen menos
    categorias.forEach(cat => {
      const filas = cat.querySelectorAll('.fila:not(.total)').length;
      const diferencia = maxFilas - filas;
      const filaTotal = cat.querySelector('.fila.total');

      for (let i = 0; i < diferencia; i++) {
        const filaVacia = document.createElement('div');
        filaVacia.classList.add('fila', 'vacia');
        filaVacia.innerHTML = '<div></div><div></div>';
        cat.insertBefore(filaVacia, filaTotal);
      }
    });
  });
}


function igualarAlturasPorIndice() {
  document.querySelectorAll('.tabla-grid').forEach(grid => {
    const categorias = Array.from(grid.querySelectorAll('.categoria'));

    // Resetear alturas
    categorias.forEach(cat => {
      Array.from(cat.children).forEach(el => {
        el.style.height = 'auto';
      });
    });

    // Convertir cada categoría en array de hijos
    const elementosPorCategoria = categorias.map(cat =>
      Array.from(cat.children)
    );

    const maxFilas = Math.max(...elementosPorCategoria.map(arr => arr.length));

    for (let i = 0; i < maxFilas; i++) {
      let maxAltura = 0;

      // Buscar altura máxima en esa "fila lógica"
      elementosPorCategoria.forEach(elementos => {
        if (!elementos[i]) return;
        const altura = elementos[i].getBoundingClientRect().height;
        if (altura > maxAltura) maxAltura = altura;
      });

      // Aplicar esa altura a todos los elementos en ese índice
      elementosPorCategoria.forEach(elementos => {
        if (!elementos[i]) return;
        elementos[i].style.height = maxAltura + 'px';
      });
    }
  });
}
// Llamarlo al cargar la página
window.addEventListener('load', () => {
  igualarFilas();
  igualarAlturasPorIndice();
});

window.addEventListener('resize', () => {
  igualarAlturasPorIndice();
  updateCarousel(contador);
});



const buttons2 = document.querySelectorAll(".btn-container button[data-tab]");
console.log(buttons2);
const tablas = document.querySelectorAll(".tabla-grid");

buttons2.forEach(button => {
  button.addEventListener("click", () =>{
    buttons2.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    
    tablas.forEach(t => t.classList.remove("active"));

    const tab = button.getAttribute("data-tab");

    document.getElementById(tab).classList.add("active")

    igualarAlturasPorIndice();
  });
});


//carousel

const WrapperContainer = document.querySelector(".galeria-section .container")
const wrappers = document.querySelectorAll(".wrapper");

const btnPrev = document.querySelector(".botones button:first-child");
const btnNext = document.querySelector(".botones button:last-child");

let index = 2;
let contador = 0;

function updateCarousel(contador){
  wrappers.forEach(w => w.classList.remove("active"));
  wrappers[index].classList.add("active");
  WrapperContainer.style.transform = `translateX(${-(((document.getElementById("foto")).offsetWidth+50)*contador)}px)`;
}

btnNext.addEventListener("click", () =>{
  index ++;
  contador ++;
  
  if(index > wrappers.length-1){
    index = 0;
    contador = -2;
  }
  
  updateCarousel(contador);
})

btnPrev.addEventListener("click", () =>{
  index --;
  contador --;

  if(index < 0){
    index = wrappers.length-1;
    contador = 2;
  }
  
  updateCarousel(contador);

})