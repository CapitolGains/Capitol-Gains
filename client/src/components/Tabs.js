import { useState } from "react";
import Trades from './Trades'

//function Tabs(trades) {
const Tabs = ({ trades }) => {
//const Tabs = ({ tradeInfo }) => {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tab-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Trades
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Portfolio
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Performance
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "active-content" : "content"}>
          <Trades className="trades" trades={trades} />
        </div>

        <div
          className={toggleState === 2 ? "active-content" : "content"}
        >
          <h2>Portfolio</h2>
        </div>

        <div
          className={toggleState === 3 ? "active-content" : "content"}
        >
          <h2>Performance</h2>
        </div>
      </div>
    </div>
  );
}

export default Tabs;