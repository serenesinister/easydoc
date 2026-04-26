//Responsividade para Mobile
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active')
        $('#mobile_btn').find('i').toggleClass('fa-x')
    });
});

//Slides para o Carrossel
document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;
    const slideWidth = 100;
    let slideInterval;

    const showSlide = index => {
        const translateValue = -index * slideWidth;
        document.querySelector('.slides').style.transform = `translateX(${translateValue}%)`;
        updateDots(index);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
        restartInterval();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
        restartInterval();
    };

    const createDots = () => {
        const dotsContainer = document.querySelector('.dots');
        dotsContainer.innerHTML = Array.from({ length: totalSlides }, (_, index) => `<span class="dot" data-index="${index}"></span>`).join('');
        updateDots(currentIndex);
    };

    const updateDots = index => {
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
    };

    const restartInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 2000);
    };

    createDots();
    showSlide(currentIndex);

    const slider = document.querySelector('.slider');

    slider.addEventListener('click', event => {
        if (event.target.classList.contains('dot')) {
            const dotIndex = parseInt(event.target.dataset.index, 10);
            showSlide(dotIndex);
            restartInterval();
        }
    });

    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', restartInterval);
    
    slideInterval = setInterval(nextSlide, 2000);
});

//API do IBGE para Formulário
const estadoSelect = document.getElementById("estado");
const cidadeSelect = document.getElementById("cidade");

let estadosCache = [];

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(estados => {
    estadosCache = estados.sort((a, b) => a.nome.localeCompare(b.nome));

    estadosCache.forEach(estado => {
      estadoSelect.innerHTML += `
        <option value="${estado.id}">
          ${estado.nome}
        </option>`;
    });
  });

estadoSelect.addEventListener("change", function () {
  const estadoId = this.value;

  cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
    .then(res => res.json())
    .then(cidades => {
      cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';

      cidades.forEach(cidade => {
        cidadeSelect.innerHTML += `
          <option value="${cidade.nome}">
            ${cidade.nome}
          </option>`;
      });
    });
});

//Reveal para Imagens
const cards = document.querySelectorAll('.card3 .card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => observer.observe(card));
