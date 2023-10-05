function infixToPostfix(input) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    function isOperator(char) {
        return precedence.hasOwnProperty(char);
    }

    function getPrecedence(operator) {
        return precedence[operator] || 0;
    }

    let outputQueue = [];
    let operatorStack = [];
    let currentToken = '';

    for (let i = 0; i < input.length; i++) 
    {
        let currentChar = input[i];

        if (!isNaN(currentChar) || /[a-zA-Z]/.test(currentChar))
            currentToken += currentChar;
        else 
        {
            if (currentToken !== '') 
            {
                outputQueue.push(currentToken);
                currentToken = '';
            }

            if (isOperator(currentChar)) 
            {
                while (operatorStack.length > 0 &&
                    getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(currentChar)) 
                {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(currentChar);
            } 
            else if (currentChar === '(') 
                operatorStack.push(currentChar);
            else if (currentChar === ')') 
            {
                while (operatorStack.length > 0 &&
                     operatorStack[operatorStack.length - 1] !== '(') 
                {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop(); // Discard '('
            }
        }
    }

    if (currentToken !== '') 
        outputQueue.push(currentToken);
    
    while (operatorStack.length > 0) 
        outputQueue.push(operatorStack.pop());

    return outputQueue.join(' ');
}
