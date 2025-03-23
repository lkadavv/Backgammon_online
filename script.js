let initialPositions = [];
document.querySelector('.button_1').addEventListener('click', () => {
    const chips = document.querySelectorAll('.chip, .chip_b');
    
    initialPositions = Array.from(chips).map(chip => {
        return {
            element: chip,
            left: window.getComputedStyle(chip).left,
            bottom: window.getComputedStyle(chip).bottom,
            top: window.getComputedStyle(chip).top,
            draggable: "true"
        };
    });

    chips.forEach(chip => {
        chip.dataset.draggable = "true";

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
                chip.style.left = '698px'; 
            }
            startDrag(e, chip);
        });
    });
});

document.querySelector('.button_2').addEventListener('click', () => {
    const chips = document.querySelectorAll('.chip, .chip_b');
    chips.forEach(chip => {
        const initialPosition = initialPositions.find(pos => pos.element === chip);
        if (initialPosition) {
            chip.style.left = initialPosition.left;
            if (chip.classList.contains('chip')) {
                chip.style.bottom = initialPosition.bottom;
            } else if (chip.classList.contains('chip_b')) {
                chip.style.top = initialPosition.top;
            }
        }
        chip.dataset.draggable = "false"; 
    });
});

function startDrag(e, chip) {
    if (chip.dataset.draggable === "false") return; 
    const startLeft = parseInt(window.getComputedStyle(chip).left);
    const offsetX = e.clientX - startLeft;
    const mouseMoveHandler = (e) => dragChip(e, chip, offsetX);

    document.addEventListener('mousemove', mouseMoveHandler);

    document.addEventListener('mouseup', () => {
        stopDrag(chip, mouseMoveHandler);
    }, { once: true });
}

function dragChip(e, chip, offsetX) {
    if (chip.dataset.draggable === "false") return; 
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
        } else if (chip.classList.contains('chip_b')) {
            snappedPosition = Math.round((newPosition - 8) / 69) * 69 + 8;
        }

        chip.style.left = `${snappedPosition}px`;
    }
}

function stopDrag(chip, mouseMoveHandler) {
    document.removeEventListener('mousemove', mouseMoveHandler);
}
