
let display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function insert(val) {
    display.value += val;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function square() {
    display.value = "(" + display.value + ")**2";
}

function cube() {
    display.value = "(" + display.value + ")**3";
}

function factorial() {
    let num = parseInt(display.value);
    if (!isNaN(num) && num >= 0) {
        display.value = fact(num);
    } else {
        display.value = "Error";
    }
}

function fact(n) {
    return (n === 0 || n === 1) ? 1 : n * fact(n - 1);
}

function calculate() {
    let expression = display.value;
    // Replace trigonometric functions and convert degrees to radians
    expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin (($1) * Math.PI / 180)");
    expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
    expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan (($1) * Math.PI / 180)");
    // Replace log and ln
    expression = expression.replace(/log\(/g, "Math.log10(");
    expression = expression.replace(/ln\(/g, "Math.log(");
    // Replace ^ with **
    expression = expression.replace(/\^/g, "**");
    // Replace % with /100
    expression = expression.replace(/([0-9.]+)%/g, "($1)/100");
    // Handle factorial in expressions
    if (expression.includes("!")) {
        expression = expression.replace(/(\d+)!/g, function(match, number) {
            return fact(parseInt(number));
        });
    }
    try {
        if (expression.trim() === "") {
            display.value = "Error";
        } else {
            let result = eval(expression);
            // Prevent displaying "undefined" or "NaN"
            if (result === undefined || isNaN(result)) {
                display.value = "Error";
            } else {
                display.value = result;
            }
        }
    } catch (error) {
        display.value = "Error";
    }
}
