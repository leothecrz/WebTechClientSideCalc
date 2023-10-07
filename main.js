const displayName = "calcDisplay"

const precedence = 
{
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
};

function isOperator(char) 
{
    return precedence.hasOwnProperty(char);
}

function getPrecedence(operator) 
{
    return precedence[operator] || 0;
}

function isInfix(input)
{
    const validOperators = "*/+-^";
    const validChars = "1234567890" + "()" + validOperators;
    let openedParenthesesCount = 0;

    for(let i=0; i<input.length; i++)
    {
        const currentChar = input[i];
        if(!validChars.includes(currentChar))
            return false;
        
        if(currentChar === '(' )
            openedParenthesesCount++;
        else if(currentChar === ')')
        {
            if(openedParenthesesCount === 0)
                return false;
            openedParenthesesCount--;
        }
        else if(validOperators.includes(currentChar))
        {
            if(i === 0 || i === input.length - 1)
                return false;

            if(validOperators.includes(input[i-1]) || 
                validOperators.includes(input[i+1]))
                return false;
        }

    }

    return openedParenthesesCount === 0;

}

function infixToPostfix(input) 
{
    let output = [];
    let operatorStack = [];
    let currentNum = "";
    for (let i = 0; i < input.length; i++) 
    {
        let activeChar = input[i];

        if (!isNaN(activeChar))
            currentNum += activeChar; // concat nums together
        else 
        {
            if (currentNum !== "") 
            {
                output.push(currentNum);
                currentNum = "";
            }

            if (isOperator(activeChar)) 
            {
                while (operatorStack.length > 0 &&
                    getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(activeChar)) 
                        output.push( operatorStack.pop() );
                operatorStack.push(activeChar);
            } 
            else if (activeChar === '(') 
                operatorStack.push(activeChar);
            else if (activeChar === ')') 
            {
                while (operatorStack.length > 0 &&
                     operatorStack[operatorStack.length - 1] !== '(') 
                        output.push( operatorStack.pop() );
                operatorStack.pop();
            }
        }
    }

    if (currentNum !== '') 
        output.push(currentNum);
    
    while (operatorStack.length > 0) 
        output.push(operatorStack.pop());

    return output;
}

function solvePostfix(input) 
{
    const stack = [];
    for (let tkn of input) 
    {
        if ( !isNaN(tkn) ) //push numbers to the stack
            stack.push(parseInt(tkn));
        else 
        {
            const op2 = stack.pop();
            const op1 = stack.pop();

            switch (tkn) 
            {
                case '+':
                    stack.push(op1 + op2);
                    break;
                case '-':
                    stack.push(op1 - op2);
                    break;
                case '*':
                    stack.push(op1 * op2);
                    break;
                case '/':
                    stack.push(op1 / op2);
                    break;
                case '^':
                    stack.push(Math.pow(op1, op2));
                    break;
            }
        }
    }
    return stack[0];
}

function appenedToCalcDisplay(char)
{
    var display = document.getElementById(displayName);
    display.value += char;
}

/**
 * 
 */
function clearCalcDisplay()
{
    document.getElementById(displayName).value = "";
}

/**
 * 
 */
function delCalcDisplay()
{
    var display = document.getElementById(displayName);
    display.value = display.value.slice(0, -1);
}

/**
 * 
 */
function evaluateInput()
{
    var out = document.getElementById(displayName);
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