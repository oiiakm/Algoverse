const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sortButton');
const generateButton = document.getElementById('generateButton');
const speedRange = document.getElementById('speedRange');
const speedLabel = document.getElementById('speedLabel');
const arraySizeInput = document.getElementById('arraySize');
const arrayOutput = document.getElementById('array-output');
const toggleArrayOutput = document.getElementById('toggleArrayOutput');
const algorithmSelect = document.getElementById('algorithm');

let array = [];
let baseDelay = 300;
let speedMultiplier = 1;
let sortingInProgress = false;
let stopSorting = false;

function generateArray() {
    const size = parseInt(arraySizeInput.value);
    const minValue = 5;
    const maxValue = 100;
    const maxHeight = 300;
    array = [];
    arrayContainer.innerHTML = '';
    arrayOutput.innerHTML = '';
    
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        array.push(value);

        const bar = document.createElement('div');
        bar.classList.add('array-bar');

        const barHeight = (value / maxValue) * maxHeight;
        bar.style.height = `${barHeight}px`;

        const barLabel = document.createElement('span');
        barLabel.innerText = value;
        bar.appendChild(barLabel);

        arrayContainer.appendChild(bar);
    }
    appendArrayContent();
}

function appendArrayContent(compareIndex = -1, swapIndex = -1, isSorted = false) {
    let arrayContent = `Current Array: [`;
    array.forEach((value, index) => {
        let colorClass = '';

        if (isSorted) {
            colorClass = 'sorted-number';
        } else if (index === compareIndex || index === compareIndex + 1) {
            colorClass = 'comparing-number';
        } else if (index === swapIndex || index === swapIndex + 1) {
            colorClass = 'swapping-number';
        }

        arrayContent += `<span class="${colorClass}">${value}</span>`;

        if (index < array.length - 1) {
            arrayContent += ', ';
        }
    });
    arrayContent += `]`;

    const arrayElement = document.createElement('div');
    arrayElement.innerHTML = arrayContent;
    arrayOutput.appendChild(arrayElement);
}

async function swapBars(index1, index2) {
    const bars = document.querySelectorAll('.array-bar');
    const bar1 = bars[index1];
    const bar2 = bars[index2];

    const bar1Position = bar1.getBoundingClientRect();
    const bar2Position = bar2.getBoundingClientRect();
    const distance = bar2Position.left - bar1Position.left;

    bar1.style.transform = `translateX(${distance}px)`;
    bar2.style.transform = `translateX(${-distance}px)`;

    bar1.classList.add('swapping');
    bar2.classList.add('swapping');

    await new Promise(resolve => setTimeout(resolve, baseDelay / speedMultiplier));

    [array[index1], array[index2]] = [array[index2], array[index1]];

    bar1.style.transform = '';
    bar2.style.transform = '';

    bar1.classList.remove('swapping');
    bar2.classList.remove('swapping');

    arrayContainer.insertBefore(bar2, bar1);
}

async function bubbleSort() {
    stopSorting = false;

    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < array.length - i - 1; j++) {
            if (stopSorting) {
                return;
            }

            const bars = document.querySelectorAll('.array-bar');
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');

            appendArrayContent(j, -1);

            await new Promise(resolve => setTimeout(resolve, baseDelay / speedMultiplier));

            if (array[j] > array[j + 1]) {
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');

                await swapBars(j, j + 1);

                swapped = true;
            }

            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
        }

        const sortedBar = document.querySelectorAll('.array-bar')[array.length - i - 1];
        sortedBar.classList.add('sorted');
    }

    const bars = document.querySelectorAll('.array-bar');
    bars.forEach(bar => bar.classList.add('sorted'));

    appendArrayContent(-1, -1, true);

    sortingInProgress = false;
    sortButton.textContent = "Start Sorting";
}

sortButton.addEventListener('click', async () => {
    if (!sortingInProgress) {
        sortingInProgress = true;
        sortButton.textContent = "Stop Sorting";
        generateButton.disabled = true;
        arraySizeInput.disabled = true;

        const selectedAlgorithm = algorithmSelect.value;

        if (selectedAlgorithm === 'bubbleSort') {
            await bubbleSort();
        } else if (selectedAlgorithm === 'quickSort') {
        } else if (selectedAlgorithm === 'mergeSort') {
        } else if (selectedAlgorithm === 'insertionSort') {
        } else if (selectedAlgorithm === 'selectionSort') {
        }

        sortingInProgress = false;
        sortButton.textContent = "Start Sorting";
        generateButton.disabled = false;
        arraySizeInput.disabled = false;
    } else {
        stopSorting = true;
        sortingInProgress = false;
        sortButton.textContent = "Start Sorting";
    }
});

generateButton.addEventListener('click', generateArray);

speedRange.addEventListener('input', (e) => {
    speedMultiplier = parseFloat(e.target.value);
    speedLabel.textContent = `${speedMultiplier.toFixed(2)}x`;
});

toggleArrayOutput.addEventListener('click', () => {
    if (arrayOutput.classList.contains('hidden')) {
        arrayOutput.classList.remove('hidden');
        toggleArrayOutput.textContent = 'Hide Array Content at Each Step';
    } else {
        arrayOutput.classList.add('hidden');
        toggleArrayOutput.textContent = 'Show Array Content at Each Step';
    }
});

generateArray();
