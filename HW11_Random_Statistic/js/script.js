const genBtn = document.getElementById('generate');
const params = ['from', 'to', 'quantity'];
const paramsValue = [1, 36, 5];

const average = array => array.reduce((a, b) => a + b) / array.length;
const even = array => array.filter(item => item % 2 === 0);
const odd = array => array.filter(item => item % 2 !== 0);

let i = 0;
params.forEach((param) => {
    attachClickHandler(param, paramsValue[i++]);
});

document.onkeydown = genBtn.onclick = () => startGenerateNumbers();

function startGenerateNumbers() {
    const randomNums = new Array(paramsValue[2]);
    for (let i = 0; i < paramsValue[2]; i++) {
        randomNums[i] = 0;
        while (randomNums[i] === 0) {
            let num = Math.floor(Math.random() * paramsValue[1] + paramsValue[0]);
            if (randomNums.indexOf(num) === -1) {
                randomNums[i] = num
            }
        }
    }
    let sortNums = randomNums.slice();
    sortNums.sort((a, b) => b - a);

    let statistic = {
        sort: sortNums.join(', '),
        min: Math.min( ...randomNums),
        max: Math.max( ...randomNums),
        average: average(randomNums),
        even: even(randomNums).length,
        odd: odd(randomNums).length,
    }
    showStatistic(randomNums, statistic);
}

function showStatistic(randomNums, statistic) {
    let innerHTML = '<tr>';
    for (let randomNum of randomNums) {
        innerHTML += `<td>${randomNum}</td>`;
    }
    innerHTML += '</tr>';
    document.getElementById('result').innerHTML = innerHTML;
    innerHTML = '';
    for (let i in statistic) {
        innerHTML += `<div>${i}: ${statistic[i]}</div>`;
    }
    document.getElementById('statistic').innerHTML = innerHTML;
}

function setValue(element) {
    let value;
    let result = prompt("Please enter your value of " + element.id, element.textContent);
    if (result != null) {
        try {
            value = +result;
        } catch (e) {
            value = +element.textContent;
        }
        if (checkValue(element, value)) {
            element.textContent = '' + value;
            paramsValue[params.indexOf(element.id)] = value;
        }
    }
}

function checkValue(element, value) {
    return value > 0 && (
        (element.id === 'from' && value <= paramsValue[1]) ||
        (element.id === 'to' && value >= paramsValue[0]) ||
        (element.id === 'quantity' && value <= paramsValue[1] - paramsValue[0])
    );
}

function attachClickHandler(elementId, elementValue) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '' + elementValue;
        element.addEventListener('click', function() {
            handleElementClick(this);
        });
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

function handleElementClick(clickedElement) {
    console.log('Element clicked:', clickedElement);
    setValue(clickedElement);
}