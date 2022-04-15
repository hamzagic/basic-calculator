import React, {useState} from 'react';
import './Display.css';

const Display = (props) => { 
    const [digit, setDigit] = useState('0');
    var firstElement;
    var secondElement;
    const operatorDigits = ['+', '-', '/', 'x', '=', '%', '+/-', 'AC'];
    const handleDigit = (num) => {
        console.log('blah', num);
        setDigit(num);
    }

    return(
        <>
            <div className='display-container'>
                <div className='upper'>0</div>
                <div className='main'>{props.element}</div>
            </div>
        </>
    );
}

export default Display;