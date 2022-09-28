import React, {useState} from 'react';
import './App.css'

const Numbers = (props) => {
    const nums = Array.from(Array(10).keys()).map(
        number => {
            return <button onClick={(e) => {
                if (props.data !== '0') props.onClick(props.data + e.target.innerHTML)
                else props.onClick(e.target.innerHTML)
            }} key={number} className="numbers"> {number} </button>
        }
    )
    return <div className='box'> {nums} </div>
}

const CountsButton = (props) => {
    const expressions = /\+|\-|\/|\*| /
    const lastNumber = props.data[props.data.length - 1]
    function checkExpressionType () {
        if (expressions.test(lastNumber)) return
        props.onClick(props.data + props.expression)
    }
        return (
            <button onClick={ () => checkExpressionType()}>
                {props.expression}
            </button>
        )
}

const App = () => {
    const [counts, setCounts] = useState('0')
    const [result, setResult] = useState('')

    const applyExpression = (countedNumber) => {
        setCounts(countedNumber)
        setResult(eval(counts))
    }

    return (
        <div className="App">
            <div className="hBox">
                <div className='block'>
                    <div style={{display: "flex", width: '100%', justifyContent: 'space-between'}}>
                        <h2 className='text'>{counts}</h2>
                        <h2 style={{width: "fit-content", height: "38px", color: 'red'}}>{result}</h2>
                    </div>
                </div>
                <Numbers data={counts} onClick={setCounts}/>
                <div style={{display: "flex", flexDirection: 'column'}}>
                    <CountsButton data={counts} expression={'+'} onClick={applyExpression}/>
                    <CountsButton data={counts} expression={'-'} onClick={applyExpression}/>
                    <CountsButton data={counts} expression={'*'} onClick={applyExpression}/>
                    <CountsButton data={counts} expression={'/'} onClick={applyExpression}/>
                </div>
            </div>
        </div>
    );
};

export default App;
