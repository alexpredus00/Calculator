const currentOperation = document.getElementById('currentOperationText');
const lastOperation = document.getElementById('lastOperationText');
const button0 = document.getElementById('button0');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');
const button7 = document.getElementById('button7');
const button8 = document.getElementById('button8');
const button9 = document.getElementById('button9');
const buttons = [button0, button1, button2, button3, button4, button5, button6, button7, button8, button9];

const operationClear = document.getElementById('operationClear');
const operationDelete = document.getElementById('operationDelete');
const operationPeriod = document.getElementById('operationPeriod');
const operationPlus = document.getElementById('operationPlus');
const operationMinus = document.getElementById('operationMinus');
const operationMultiply = document.getElementById('operationMultiply');
const operationDivide = document.getElementById('operationDivide');
const operationEnter = document.getElementById('operationEnter');
const operations = [operationClear, operationDelete, operationPeriod, operationPlus, operationMinus, operationMultiply, operationDivide, operationEnter];
const operationSign = ['C', 'D', '.', '+', '-', 'x', '/', 'E']


let previousNumber = '';
let secondOperation = 0;
let secondPeriod = 0;
let operationCheck = ['+', '-', 'x', '/']; 
let result = '';
let history = document.getElementById('lastOperationText');


function updateScreen(number){
    setFont();
    if(previousNumber == '' && (number >= 0 && number <= 9) && !(previousNumber == '+' || previousNumber == '-' || previousNumber == 'x' || previousNumber == '/') && !(previousNumber === 0)){
        currentOperation.innerHTML += '' + number;
        previousNumber = number;
    } else if((number >= 0 && number <= 9)){ 
        if(!(secondPeriod == 1 && (previousNumber >= 0 && previousNumber <= 9))){ 
            currentOperation.innerHTML += "" + number;
            previousNumber = number;
        }
    } else if((number == "+" || number == "-" || number == "/" || number == "x") && !(previousNumber == '+' || previousNumber == '-' || previousNumber == 'x' || previousNumber == '/') && secondOperation == 0){
        if(previousNumber == '.'){
            currentOperation.innerHTML = currentOperation.innerHTML.slice(0, -1);
        }
        currentOperation.innerHTML += '' + '   ' + number + ' ';
        previousNumber = number;
        secondOperation = 1;
        secondPeriod = 0;
    } else if(number == "E"){
        if(secondOperation == 1){
            for(let i = 0; i < 4; i++){
                if(currentOperation.innerHTML.indexOf(operationCheck[i]) != -1){
                    result = currentOperation.innerHTML.split(operationCheck[i]);
                    history.innerHTML = currentOperation.innerHTML
                    if(operationCheck[i] == '+'){
                        if(result[0].indexOf('.') != -1 || result[1].indexOf('.') != -1){
                            result = parseFloat(result[0]) + parseFloat(result[1]);
                        } else {
                            result = parseInt(result[0]) + parseInt(result[1]);
                        }  
                    }
                    if(operationCheck[i] == '-'){
                        if(result[0].indexOf('.') != -1 || result[1].indexOf('.') != -1){
                            result = parseFloat(result[0]) - parseFloat(result[1]);
                        } else {
                            result = parseInt(result[0]) - parseInt(result[1]);
                        }  
                    }
                    if(operationCheck[i] == 'x'){
                        if(result[0].indexOf('.') != -1 || result[1].indexOf('.') != -1){
                            result = parseFloat(result[0]) * parseFloat(result[1]);
                        } else {
                            result = parseInt(result[0]) * parseInt(result[1]);
                        }  
                    }
                    if(operationCheck[i] == '/'){
                        if(result[0].indexOf('.') != -1 || result[1].indexOf('.') != -1){
                            result = parseFloat(result[0]) / parseFloat(result[1]);
                        } else {
                            result = parseInt(result[0]) / parseInt(result[1]);
                        }
                
                    }

                if(result.toString().indexOf('.') != -1){
                    result = result.toFixed(1);
                }
                currentOperation.innerHTML = result;
                previousNumber = result.toString().slice(-1);
                secondOperation = 0;
                if(result.toString().indexOf('.') != -1){
                    secondPeriod = 1;
                } else {
                    secondPeriod = 0;
                    }
                setFont();
                }
            }
        }
    } else if(number == "." && secondPeriod == 0){
        if(!(previousNumber === '') && !(number == '+' || number == '-' || number == 'x' || number == '/')) {
            currentOperation.innerHTML += '.';
            previousNumber = number;
            secondPeriod = 1;
        }
    } else if(number == "C"){
        currentOperation.innerHTML = '';
        previousNumber = '';
        secondOperation = 0;
        secondPeriod = 0;
    } else if(number == "D"){
        if((previousNumber == '+' || previousNumber == '-' || previousNumber == 'x' || previousNumber == '/') || currentOperation.innerHTML.slice(0.-1) == ' '){
            currentOperation.innerHTML = currentOperation.innerHTML.slice(0, -5);
            previousNumber = currentOperation.innerHTML.slice(-1);
            secondOperation = 0;
            if(currentOperation.innerHTML.toString().indexOf('.') != -1){
                secondPeriod = 1;
            } else {
                secondPeriod = 0;
            }
            
        } else {
            currentOperation.innerHTML = currentOperation.innerHTML.slice(0, -1);
            previousNumber = currentOperation.innerHTML.slice(-1);
            secondOperation = 0;
            if(currentOperation.innerHTML.indexOf('.') != -1){
                secondPeriod = 1;
            } else {
                secondPeriod = 0;
            }
        }
    }
}


for(let i = 0; i < 10; i++){
    buttons[i].addEventListener('click', function() {
        updateScreen(i);
    })
}

for(let i = 0; i < 8; i++){
    operations[i].addEventListener('click', function() {
        updateScreen(operationSign[i]);
    })
}

operationPeriod.addEventListener('click', function() {
    updateScreen('.')
})

function setFont(){

    if(currentOperation.innerHTML.length < 14){
        currentOperation.style.fontSize = "50px";
    } else if(currentOperation.innerHTML.length < 27){
        currentOperation.style.fontSize = "30px";
    } else {
        currentOperation.style.fontSize = "20px";
    }
}


document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    
    if (code == 'Digit0') {
      updateScreen(0);
    } else if (code == 'Digit1') {
        updateScreen(1);
    } else if (code == 'Digit2') {
        updateScreen(2);
    } else if (code == 'Digit3') {
        updateScreen(3);
    } else if (code == 'Digit4') {
        updateScreen(4);
    } else if (code == 'Digit5') {
        updateScreen(5);
    } else if (code == 'Digit6') {
        updateScreen(6);
    } else if (code == 'Digit7') {
        updateScreen(7);
    } else if (code == 'Digit8') {
        updateScreen(8);
    } else if (code == 'Digit9') {
        updateScreen(9);
    } else if (code == 'Enter') {
        updateScreen('E');
    } else if (code == 'KeyC') {
        updateScreen('C');
    } else if (code == 'Backspace') {
        updateScreen('D');
    } else if (code == 'Period') {
        updateScreen('.');
    } else if (code == 'Equal' && event.shiftKey == true) {
        updateScreen('+');
    } else if (code == 'Minus') {
        updateScreen('-');
    } else if (code == 'KeyX') {
        updateScreen('x');
    } else if (code == 'Slash') {
        updateScreen('/');
    } 
});