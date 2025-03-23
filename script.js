let initialPositions = [];
document.querySelector('.button_1').addEventListener('click', () => {
const chips = document.querySelectorAll('.chip, .chip_b');
initialPositions = Array.from(chips).map(chip => {
    return {
        element: chip,
        left: window.getComputedStyle(chip).left,
        bottom: window.getComputedStyle(chip).bottom,
        draggable: chip.dataset.draggable
    };
});
chips.forEach(chip => {
    chip.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        if (chip.dataset.draggable === "false") {
            return; 
        }
        if (chip.classList.contains('chip')) {
            chip.style.bottom = '0px'; 
            chip.style.left = '77px'; 
        }
        if (chip.classList.contains('chip_b')) {
            chip.style.top = '0px'; 
            chip.style.right = '77px'; 
        }
        startDrag(e, chip);
    });

    chip.addEventListener('click', (e) => {
        if (chip.dataset.draggable === "false") {
            chip.dataset.draggable = "true"; 
        } else {
            chip.dataset.draggable = "false"; 
        }
    });
});
});
document.querySelector('.button_2').addEventListener('click', () => {
    const chips = document.querySelectorAll('.chip, .chip_b');
    chips.forEach(chip => {
        const initialPosition = initialPositions.find(pos => pos.element === chip);
        if (initialPosition) {
            chip.style.left = initialPosition.left; 
            chip.style.bottom = initialPosition.bottom; 
            chip.dataset.draggable = initialPosition.draggable; 
        }
    });
});

function startDrag(e, chip) {
    const startLeft = parseInt(window.getComputedStyle(chip).left);
    const offsetX = e.clientX - startLeft; 
    const mouseMoveHandler = (e) => dragChip(e, chip, offsetX);
    document.addEventListener('mousemove', mouseMoveHandler);
    
    document.addEventListener('mouseup', () => {
        stopDrag(chip, mouseMoveHandler);
    }, { once: true });
}

function dragChip(e, chip, offsetX) {
    const mouseX = e.clientX;
    const newPosition = mouseX - offsetX;

    let minPosition, maxPosition;

    if (chip.classList.contains('chip')) {
        minPosition = 77; 
        maxPosition = 767; 
    } else if (chip.classList.contains('chip_b')) {
        minPosition = 8; 
        maxPosition = 698; 
    }

    if (newPosition >= minPosition && newPosition <= maxPosition) {
        let snappedPosition;
        
        if (chip.classList.contains('chip')) {
            snappedPosition = Math.round((newPosition - 77) / 69) * 69 + 77;
        }
        
        else if (chip.classList.contains('chip_b')) {
            snappedPosition = Math.round((newPosition - 8) / 69) * 69 + 8;
        }

        chip.style.left = `${snappedPosition}px`;
    }
}

function stopDrag(chip, mouseMoveHandler) {
    document.removeEventListener('mousemove', mouseMoveHandler);
    chip.dataset.draggable = "false"; 
}