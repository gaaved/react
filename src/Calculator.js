import {useState} from "react";


function Calculator() {
    const numbers = Array(10).fill(0).map((_,i) => i );
    const signs = ['+', '-', '*', '/', '.', 'C', '<-'];
    const [stringCalculate, setStringCalculate] = useState('');

    function handleClick(props){
        if(signs.includes(props) && !signs.includes(stringCalculate[stringCalculate.length -1]) && stringCalculate && props !== '<-'){
            //setStringCalculate(stringCalculate + props)
            setStringCalculate((stringCalculate) => stringCalculate + props)
        }
        if(!signs.includes(props) && typeof stringCalculate !== 'number'){
            //setStringCalculate(stringCalculate + props)
            setStringCalculate((stringCalculate) => stringCalculate + props)
        }
        if(props === 'C' ){
            setStringCalculate('')
        }
        if(props === '<-' ){
            //setStringCalculate(stringCalculate.slice(0, -1))
            if(typeof stringCalculate === 'string'){
                setStringCalculate((stringCalculate) => stringCalculate.slice(0, -1))
            }
        }
    }

    function handleClickEquals(props){
        // eslint-disable-next-line no-eval
        setStringCalculate(eval(props))
    }

    const listNumbers = numbers.reverse().map((number) =>
        <button key={number} className="squareButton" onClick={() => handleClick(String(number))}>{number}</button>
    );
    const listSigns = signs.map((sign) =>
        <button key={sign} className="squareButtonSigns" onClick={() => handleClick(sign)}>{sign}</button>
    );

    return (
        <div>
            <input className="calculateString" type="string" value={stringCalculate} readOnly={true}/>
            <div className="buttons">
                <div className="calculateNumber">
                    {listNumbers}
                </div>
                <div className="calculateSigns">
                    {listSigns}
                    <button className="squareButtonEquals" onClick={() => handleClickEquals(stringCalculate)}>=</button>
                </div>
            </div>
        </div>
    );

}
export default Calculator;