const arraySize = 10;
let array = [];
const arrayContainer = document.getElementById('array');
const startSortButton = document.getElementById('startSort');

function generateRandomArray() {
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value}px`;
        bar.textContent = value;
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const bubbleSortModule = await BubbleSortModule();
    const bubbleSortFunc = bubbleSortModule.cwrap('bubbleSort', null, ['array', 'number']);
    bubbleSortFunc(array, array.length);
    renderArray();
}

startSortButton.addEventListener('click', bubbleSort);

generateRandomArray();
