(function() {
    const sliders = [...document.querySelectorAll('.slider__body')];
    const arrowNext = document.querySelector('#next');
    const arrowBefore = document.querySelector('#before');
    let value;

    arrowNext.addEventListener('click', () => changePosition(1));
    arrowBefore.addEventListener('click', () => changePosition(-1));

    function changePosition(change) {
        const currentElement = Number(document.querySelector('.slider__body--show').dataset.id);
        value = currentElement + change;

        if (value === 0 || value === sliders.length + 1) {
            value = value === 0 ? sliders.length : 1;
        }

        sliders[currentElement - 1].classList.toggle('slider__body--show');
        sliders[value - 1].classList.toggle('slider__body--show');
    }

    // Función para cambiar automáticamente cada 3 segundos
    function autoChange() {
        setInterval(() => {
            changePosition(1); // Avanzar al siguiente slide
        }, 5000); // Cambio cada 3 segundos
    }

    // Iniciar el cambio automático
    autoChange();
})();
