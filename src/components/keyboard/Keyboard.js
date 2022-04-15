import React, {useReducer} from 'react';
import Display from '../display/Display';
import './Keyboard.css';

const evaluate = (prev, current, operator) => {
    var total;
    switch(operator) {
        case '+':
            total = parseFloat(prev) + parseFloat(current);
            break;
        case '-':
            total = parseFloat(prev) - parseFloat(current);
            break;
        case '/':
            total = parseFloat(prev) / parseFloat(current);
            break;
        case 'x':
            total = parseFloat(prev) * parseFloat(current);
            break;
    }
    return total;
}
const reducer = (state, action) => {
    switch(action.type)
    {
        case 'ADD_DIGIT':
            if (action.value === '0' && state.currentOperand === '0') return state;
            if (action.value === '.' && state.currentOperand.includes('.')) return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${action.value}`,
                previousOperand: state.previousOperand,
                operation: state.operation
            };
        case 'SET_OPERAND':
            if(state.currentOperand == undefined && 
               state.previousOperand == undefined) return '';
            return {
                ...state,
                currentOperand: undefined,
                previousOperand: state.currentOperand,
                operation: action.value
            }
        case 'CALCULATE':
            if (state.operation === '=')
            {
                if (state.operation == undefined || 
                    state.currentOperand == undefined ||
                    state.previousOperand == undefined) {
                        console.log('blah')
                        return state;
                }
                else if (action.value == '=') return state;
                else {
                    console.log('blEh')
                    return {
                        ...state,
                        previousOperand: state.currentOperand,
                        currentOperand: '',
                        operation: action.value
                    }
                }
            }
            console.log('blIh ', action.value)
            return {
                currentOperand: '',
                previousOperand: evaluate(state.previousOperand, state.currentOperand, state.operation).toString(),
                operation: action.value,
                overwrite: true
            }
        case 'CLEAR_SCREEN':
            return {}
        case 'DELETE_DIGIT':
            if (state.currentOperand == undefined) return state;
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: undefined
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
    }
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
});

const formatOperand = (operand) => {
    if (operand == undefined) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == undefined) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
} 
const Keyboard = () => {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
    const operatorDigits = ['+', '-', '/', 'x', '=', '%', 'DEL', 'AC'];
    var element = '';
    const getInput = (e) => {
        element = e.target.innerText;
        if (element == 'AC') dispatch({type: 'CLEAR_SCREEN'});
        if(!operatorDigits.includes(e.target.innerText))
        {
            console.log('clicked', element);
            dispatch({type: 'ADD_DIGIT', value: element});    
        }
        else {
            if (operation == undefined && element != 'AC' && element != 'DEL') {
                dispatch({type: 'SET_OPERAND', value: element})
            }
            else if (element === 'DEL')
            {
                dispatch({type: 'DELETE_DIGIT'});
            }
            else {
                dispatch({type: 'CALCULATE', value: element});   
            }
        }
    }
    return(
        <>
            {/* <Display getInput={element} /> */}
            <div className='display-container'>
                <div className='upper'>{formatOperand(previousOperand)} {operation}</div>
                <div className='main'>{formatOperand(currentOperand)}</div>
            </div>
            <div className='key-background'>
                <div className='key-container'>
                    <div className='keys' onClick={getInput}>AC</div>
                    <div className='keys' onClick={getInput}>%</div>
                    <div className='keys' onClick={getInput}>DEL</div>
                    <div className='keys-op' onClick={getInput}>/</div>
                </div>
                <div className='key-container'>
                    <div className='keys' onClick={getInput}>7</div>
                    <div className='keys' onClick={getInput}>8</div>
                    <div className='keys' onClick={getInput}>9</div>
                    <div className='keys-op' onClick={getInput}>x</div>
                </div>
                <div className='key-container'>
                    <div className='keys' onClick={getInput}>4</div>
                    <div className='keys' onClick={getInput}>5</div>
                    <div className='keys' onClick={getInput}>6</div>
                    <div className='keys-op' onClick={getInput}>-</div>
                </div>
                <div className='key-container'>
                    <div className='keys' onClick={getInput}>1</div>
                    <div className='keys' onClick={getInput}>2</div>
                    <div className='keys' onClick={getInput}>3</div>
                    <div className='keys-op' onClick={getInput}>+</div>
                </div>
                <div className='key-container'>
                    <div className='keys-big' onClick={getInput}>0</div>
                    <div className='keys' onClick={getInput}>.</div>
                    <div className='keys-op' onClick={getInput}>=</div>
                </div>
            </div>
        </>
    );
}

export default Keyboard;