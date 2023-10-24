import {useState} from "react";

function Calculator() {
    const [numbers] = [Array(10).fill(0).map((_,i) => i )];
    const signs = ['+', '-', '*', '/', '.', 'C', '<-'];
    const [stringCalculate, setStringCalculate] = useState('');

    function handleClick(props){
        if(signs.includes(props) && !signs.includes(stringCalculate[stringCalculate.length -1]) && stringCalculate){
            setStringCalculate(stringCalculate + props)
        }
        if(!signs.includes(props)){
            setStringCalculate(stringCalculate + Number(props))
        }
        if(props === 'C' ){
            setStringCalculate('')
        }
        if(props === '<-' ){
            setStringCalculate(stringCalculate.slice(0, -1))
        }
    }

    function handleClickEquals(props){
        // eslint-disable-next-line no-eval
        setStringCalculate(eval(props))
    }

    const listNumbers = numbers.reverse().map((number) =>
        <button className="squareButton" onClick={() => handleClick(number)}>{number}</button>
    );
    const listSigns = signs.map((sign) =>
        <button className="squareButtonSigns" onClick={() => handleClick(sign)}>{sign}</button>
    );

    return (
        <>
            <input className="calculateString" type="string" value={stringCalculate}/>
            <div className="buttons">
                <div className="calculateNumber">
                    {listNumbers}
                </div>
                <div className="calculateSigns">
                    {listSigns}
                    <button className="squareButtonEquals" onClick={() => handleClickEquals(stringCalculate)}>=</button>
                </div>
            </div>
        </>
    );

}
export default Calculator;