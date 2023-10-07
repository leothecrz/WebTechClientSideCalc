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
