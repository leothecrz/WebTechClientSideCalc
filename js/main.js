
function appenedToCalcDisplay(char)
{
    var display = document.getElementById("calcDisplay");
    display.value += char;
}

/**
 * 
 */
function clearCalcDisplay()
{
    document.getElementById("calcDisplay").value = "";
}

/**
 * 
 */
function delCalcDisplay()
{
    var display = document.getElementById("calcDisplay");
    display.value = display.value.slice(0, -1);
}

/**
 * 
 */
function evaluateInput()
{
    var out = document.getElementById("calcDisplay").value;
    if(isInfix(out))
    {
        var stage2 = infixToPostfix(out);
        var ans = solvePostfix(stage2);
        alert(ans);
    }
    else
    {
        alert("Invalid Input");
    }
}

const buttonDiv = document.getElementById("calcButtons");
const buttons = buttonDiv.querySelectorAll('button');

buttons.forEach( button => 
{
    if(button.id != "")
        return;
    button.addEventListener('click', 
    function() 
    {
        appenedToCalcDisplay(button.innerText)
    });
})