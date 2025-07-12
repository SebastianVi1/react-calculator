import "./App.css";
import { useCalculator } from "./hooks/useCalculator";

function App() {
  const { currentValue, handleButtonClick, previousValue, operation } = useCalculator();

  const clickHandler = (e: React.MouseEvent) => {
    const text: string | null = e.currentTarget.textContent;
    if (text) {
      handleButtonClick(text);
    }
  };

  return (
    <div className="flex-container">
      <div className="main-container">
        <h2>Calculator</h2>
        <div className="screen">
          <div className="previous-operand">
            {previousValue} {operation}
          </div>
          <div className="current-operand">
            {currentValue}
          </div>
        </div>
        
        <div className="pad-container">
          <div onClick={clickHandler} className="button ac">
            AC
          </div>
          <div onClick={clickHandler} className="button delete">
            DEL
          </div>
          <div onClick={clickHandler} className="button">
            /
          </div>
          <div onClick={clickHandler} className="button multiply">
            x
          </div>
          <div onClick={clickHandler} className="button">
            7
          </div>
          <div onClick={clickHandler} className="button">
            8
          </div>
          <div onClick={clickHandler} className="button">
            9
          </div>
          <div onClick={clickHandler} className="button minus">
            -
          </div>
          <div onClick={clickHandler} className="button">
            6
          </div>
          <div onClick={clickHandler} className="button">
            5
          </div>
          <div onClick={clickHandler} className="button">
            4
          </div>
          <div onClick={clickHandler} className="button plus">
            +
          </div>
          <div onClick={clickHandler} className="button">
            1
          </div>
          <div onClick={clickHandler} className="button">
            2
          </div>
          <div onClick={clickHandler} className="button">
            3
          </div>
          <div onClick={clickHandler} className="button equals">
            =
          </div>
          <div onClick={clickHandler} className="button zero">
            0
          </div>
          <div onClick={clickHandler} className="button">
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
