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
