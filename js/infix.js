
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