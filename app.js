document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred

    let runningTotal = 0;
    let buffer = "0";       // must be string to compose the number to show on display
    let previousOperator = null;
    const display = document.querySelector('.display');

    const symbol = document
        .querySelector('.calc-buttons')
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
    });

    function buttonClick(value){
        if(isNaN(parseInt(value))){
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        if(buffer !== "0" || value === "C" || value === "←") {
            rerender();
        }
    };

    function handleNumber(value){
        if(buffer === "0"){         /*prevents multiple zeros if display is already 0 */ 
            buffer = value;
        } else {
            buffer += value;
        }
    };

    function handleSymbol(value){
        switch(value){
            case 'C':
                buffer = "0";
                runningTotal = 0;
                previousOperator = null;
                break;
            case '=':
                if(previousOperator === null){
                    return;                       /* if there is no previous operator*/
                }
                flushOperation(parseInt(buffer)); /* otherwise commit buffer to this operator */
                previousOperator = null;
                buffer = "" + runningTotal;       /* turning runningTotal into a string using string concatenation */
                runningTotal = 0;
                break;
            case '←':
                if(buffer.length === 1){
                    buffer = "0";
                } else {
                    buffer = buffer.substring(0, buffer.length - 1);
                }
                break;    
            default:
                handleMath(value);    
                break;
        }
    };

    function handleMath(value){
        const intBuffer = parseInt(buffer);
        if(runningTotal === 0) {
            runningTotal = intBuffer;
        } else {
            flushOperation(intBuffer);
        }
        previousOperator = value;
        buffer = "0";
    }
    
    function flushOperation(intBuffer){
        if(previousOperator === '÷'){
            runningTotal /= intBuffer;
        } else if(previousOperator === '×'){
            runningTotal *= intBuffer;
        } else if(previousOperator === '-'){
            runningTotal -= intBuffer;
        } else if(previousOperator === '+'){
            runningTotal += intBuffer;
        }
    }

    function rerender(){
        display.innerText = buffer;
    };
});