
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
    var out = document.getElementById("calcDisplay");
    if(isInfix(out.value))
    {
        var ans = solvePostfix( infixToPostfix( out.value ) );
        //alert(ans);
        out.value = ans.toString();
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