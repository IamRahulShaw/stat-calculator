import { useState } from "react";
import "./App.css";

function App() {
  const initialDataStat = {
    Mean: "",
    Meadian: "",
    Mode: "",
    StandardDeviation: "",
  };
  const [input, setInput] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [dataStat, setDataStat] = useState(initialDataStat);

  function handleAdd() {
    dataArray.push(Number(input));
    setInput("");
  }
  function handleReset() {
    setDataArray([]);
    setDataStat(initialDataStat);
  }
  function handleSubmit() {
    let mean, median, mode, sd;
    let map = new Map();
    dataArray.sort((a, b) => a - b);
    let arrayLength = dataArray.length;
    if (arrayLength % 2 == 0) {
      median =
        (dataArray[arrayLength / 2] + dataArray[arrayLength / 2 + 1]) / 2;
    } else {
      median = dataArray[(arrayLength + 1) / 2];
    }

    mean =
      dataArray.reduce((prevVal, currVal) => prevVal + currVal, 0) /
      arrayLength;

    map.set(dataArray[0], 1);
    for (let i = 1; i < dataArray.length; i++) {
      if (dataArray[i] == dataArray[i - 1]) {
        map.set(dataArray[i], map.get(dataArray[i]) + 1);
      } else {
        map.set(dataArray[i], 1);
      }
    }
    let maximumOccur = Math.max(...Array.from(map.values()));
    let modeArray = [];
    for (let entries of map) {
      if (entries[1] == maximumOccur) {
        modeArray.push(entries[0]);
      }
    }
    if (modeArray.length == 1) {
      mode = modeArray[0];
    } else {
      mode = modeArray.join(", ");
    }

    let squaredArray = dataArray.map((element) => Math.pow(element - mean, 2));

    sd = Math.pow(
      squaredArray.reduce((prevVal, currVal) => prevVal + currVal, 0) /
        (arrayLength - 1),
      1 / 2
    );

    setDataStat({
      Mean: mean,
      Meadian: median,
      Mode: mode,
      StandardDeviation: sd,
    });

    setDataArray([]);
  }

  return (
    <>
      <div className="inputDiv middle">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="number"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            id="inputNumber"
            placeholder="Enter the values"
          />
          <div id="buttonDiv">
            <button id="add" onClick={handleAdd}>
              Add
            </button>
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
            <button id="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="dataDiv middle">
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mean</td>
              <td>{dataStat.Mean}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{dataStat.Meadian}</td>
            </tr>
            <tr>
              <td>Mode</td>
              <td>{dataStat.Mode}</td>
            </tr>
            <tr>
              <td>Standard Deviation</td>
              <td>{dataStat.StandardDeviation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
