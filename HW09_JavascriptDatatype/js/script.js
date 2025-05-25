const applyBtn = document.getElementById('apply-btn');
const modalsBtn = document.getElementById('modals-btn');
applyBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showNumber();
});
modalsBtn.addEventListener('click', function(event) {
    event.preventDefault();
    startPrompt();
});
const errorText = "Error initial data: «";
const resultDiv = document.getElementById('result');

function showNumber() {
    const number = getNumber();
    const output = getOutput();
    if (number !== null) {
        output.bin.textContent = number.toString(10);
        output.dec.textContent = number.toString(2);
        output.hex.textContent = number.toString(16);
        output.int.textContent = Math.trunc(number);
        output.int_reverse.textContent = getReverseIntegerPart(number);
        output.int_sum.textContent = getSumIntegerPart(number);
    } else {
        for (let part in output) {
            if (output[part] !== undefined) {
                output[part].textContent = errorText + getInputData() + "»";
            }
        }
    }
}

function getNumber() {
    const inputText = getInputData();
    let res;
    try {
        res = parseFloat(inputText);
    } catch {
        res = 0;
    }
    if (!res) res = null;
    console.log(res);
    return res;
}

function getInputData() {
    return document.getElementById("enteringNumber").value;
}

function getOutput() {
    return {
        bin: document.getElementById("bin"),
        dec: document.getElementById("dec"),
        hex: document.getElementById("hex"),
        int: document.getElementById("int"),
        int_reverse: document.getElementById("int-reverse"),
        int_sum: document.getElementById("int-sum"),
    }
}

function getReverseIntegerPart(number) {
    let currentValue = Math.trunc(number);
    let sign = "";
    if (currentValue < 0) {
        sign = "-";
        currentValue = currentValue * -1;
    }
    return sign + currentValue.toString().split("").reverse().join("");
}

function getSumIntegerPart(number) {
    let currentValue = Math.trunc(number);
    if (currentValue < 0) currentValue = currentValue * -1;
    const digits = currentValue.toString().split("");
    let result = digits.join(" + ");
    let res = 0;
    for (const digit of digits) {
        res += +digit;
    }
    result += " = " +  res;
    return result;
}

function startPrompt() {
    const exp = window.prompt("Type some mathematical expression.\nEx. 7+(5-2)*3.", "2*2");
    let result;
    try {
        result = eval(exp);
        alert("Result of (" + exp + ") = " + result);
        return;
    } catch {}
    alert("Error expression «" + exp + "».")
}