import "./table.css";

export default function Table(props) {
  const { tableInfo, dispatcher } = props;
  const { list, length, current } = tableInfo;
  const width = `${(1 / length) * 100}%`;

  const onClickCell = (item) => {
    console.log("点击了:", item);
    const targetNum = current + 1;
    if (item !== targetNum) {
      dispatcher({ type: "tip", data: `当前应当点击：${targetNum}` });
    } else {
      dispatcher({ type: "next", data: { tip: null, current: targetNum } });
      if (item === list.length) {
        dispatcher({ type: "complete" });
      }
    }
  };

  const onStart = () => {
    dispatcher({ type: "start" });
  };

  const renderTable = () => {
    return (
      <div className="table">
        {list.map((item, index) => {
          let tag = index % 2 === 0;
          if (length % 2 === 0) {
            tag =
              Math.floor(index / length) % 2 === 0
                ? index % 2 === 1
                : index % 2 === 0;
          }

          return (
            <div
              key={item}
              className="cell"
              onClick={() => onClickCell(item)}
              style={{
                width,
                height: width,
                color: tag ? "white" : " black",
                backgroundColor: tag ? "black" : " white",
                borderWidth: current === item ? "20px" : "0px"
              }}
            >
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStartButton = () => {
    return (
      <div className="start-cover">
        <button className="start-button" onClick={() => onStart()}>
          点击开始
        </button>
      </div>
    );
  };
  return (
    <div className="container">
      {current < 0 ? renderStartButton() : null}
      {renderTable()}

      <h5> 评测结果 以下数据以 5x5 为参考 </h5>
      <p>7—12岁 26"以上为优秀 42"属于中等水平 50"则问题较大</p>
      <p>12—17岁 16 "以上为优良 26"属于中等水平 36"则问题较大</p>
      <p> 18岁及以上成年人 最快可到达 8 "的程度 20"为中等程度 </p>
    </div>
  );
}
