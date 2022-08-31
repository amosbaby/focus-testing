import { useReducer } from "react";
import Control from "./control";
import "./styles.css";
import Table from "./table/table";

const createList = (length) =>
  Array(length * length)
    .fill(1)
    .map((item, index) => item + index)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

const defaultState = {
  length: 5,
  current: -1,
  list: createList(5),
  history: [],
  tip: null,
  result: null,
  startTime: new Date()
};

export default function App() {
  // const [duration, setDuration] = useState(0);
  // const [timerId, setTimerId] = useState(null);
  const [tableInfo, tableDispatcher] = useReducer((state, { data, type }) => {
    switch (type) {
      case "length":
        return {
          ...state,
          history: [],
          length: data,
          result: null,
          list: createList(data),
          current: -1
        };
      case "current":
        return { ...state, current: data };
      case "list":
        console.log("list:", data);
        return { ...state, list: [...data] };
      case "tip":
        return { ...state, tip: data };
      case "next":
        return { ...state, ...data };
      case "complete": {
        const cost = (new Date().getTime() - state.startTime.getTime()) / 1000;
        const history = [...state.history, cost].sort();
        const result = ` 本次用时 : ${cost.toFixed(
          1
        )}秒\n历史最佳${history[0].toFixed(1)}`;
        // console.log("clearInterval:", timerId);
        // clearInterval(timerId);
        // setDuration(0);
        return { ...state, result, history, current: -1 };
      }
      case "start": {
        // setDuration(0);
        // console.log("clearInterval:", timerId);
        // clearInterval(timerId);
        // const tempId = setInterval(() => {
        //   setDuration((value) => value + 1);
        // }, 1000);
        // console.log("tempId:", tempId);
        // setTimerId(tempId);
        return {
          ...state,
          result: null,
          length: state.length,
          startTime: new Date(),
          current: 0,
          list: createList(state.length)
        };
      }

      default:
        break;
    }
  }, defaultState);

  return (
    <div className="App">
      <h1> 舒尔特表格：测试专注力 </h1>
      <div>本次用时 : {tableInfo.result || "0秒"}</div>
      <div style={{ color: "red", opacity: tableInfo.tip ? 1 : 0 }}>
        {tableInfo.tip}。
      </div>
      <Control tableInfo={tableInfo} dispatcher={tableDispatcher} />
      <Table tableInfo={tableInfo} dispatcher={tableDispatcher} />
    </div>
  );
}
