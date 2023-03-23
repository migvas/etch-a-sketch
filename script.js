// Get all the needed elements
const grid = document.getElementById('grid');
const reset = document.getElementById('reset');
const slider = document.getElementById('grid-size');
const sliderVal = document.getElementById('slider-val');

// Grid Size default is the same value that comes from the slider
sliderVal.textContent = `Grid Size: ${slider.value}`;

// Starting selected mode
let selectedMode = 'default';
 
// Change the color of the cell depending on the selected mode
const changeCellColor = cell => {
    let color;
    switch(selectedMode){
        case 'rainbow':
            cell.classList.remove('gray');
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            color = `rgb(${r}, ${g}, ${b})`;
            break;
        
        case 'grayscale':
            if(cell.classList.contains('gray')){
                const alpha = parseFloat(cell.style['background-color'].slice(-4, -1));
                color = `rgba(0,0,0,${alpha && alpha <= 0.9 ? alpha + 0.1 : 1})`;

            } else {
                cell.classList.add('gray')
                color = 'rgba(0,0,0,0.1)';
            }
            break;

        default:
            cell.classList.remove('gray');
            color = 'black';
            break;
    }

    cell.style['background-color'] = color;
}

// Create the grid with some grid size
const createGrid = n => {
    // If there is a grid already delete it
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    // Loop to create all the cells inside the grid
    for (let i = 0; i < n*n; i++) {
        let cell = document.createElement('div');
        
        // Give it a class cell to aplly styles
        cell.classList.add('cell');

        // Add an hover event listener so it can change color
        cell.addEventListener('mouseover', () => {
            changeCellColor(cell);
        });
    
        grid.appendChild(cell);
    }

    // After adding all the cells set their size
    grid.style['grid-template-columns'] = `repeat(${n}, 1fr)`;
}

// Change the grid size message and create a new grid when the slider changes
slider.oninput = () => {
    sliderVal.textContent = `Grid Size: ${slider.value}`;
    createGrid(slider.value);
};


// Reset the grid when the Reset button is clicked
reset.addEventListener('click', () => {
    createGrid(slider.value);
});

// Get all the mode buttons and change the mode when one is clicked
const modes = document.querySelectorAll('.mode');

modes.forEach(m => {
    m.addEventListener('click', () => {
        const prev = document.getElementById(selectedMode);
        prev.classList.remove('selected-mode');
        m.classList.add('selected-mode');
        selectedMode = m.id;
    })
})

// Create the starting grid
createGrid(slider.value);