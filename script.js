const grid = document.getElementById('grid');
const reset = document.getElementById('reset');
const slider = document.getElementById('grid-size');
const sliderVal = document.getElementById('slider-val');

sliderVal.textContent = `Grid Size: ${slider.value}`;

const changeCellColor = cell => {
    cell.style['background-color'] = 'black';
}

const createGrid = n => {
    // If there is a grid already delete it
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    // Loop to create all the cells inside the grid
    for (let i = 0; i < n*n; i++) {
        let cell = document.createElement('div');
        
        // Give it a class cell to aplly styles
        cell.className = 'cell';

        // Add an hover event listener so it can change color
        cell.addEventListener('mouseover', () => {
            changeCellColor(cell);
        });
    
        grid.appendChild(cell);
    }

    // After adding all the cells set their size
    grid.style['grid-template-columns'] = `repeat(${n}, 1fr)`;
}


slider.oninput = () => {
    sliderVal.textContent = `Grid Size: ${slider.value}`;
    createGrid(slider.value);
};

reset.addEventListener('click', () => {
    createGrid(slider.value);
});

createGrid(slider.value);