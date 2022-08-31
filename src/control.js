export default function Control(props) {
  const { tableInfo, dispatcher } = props;
  const { length, current } = tableInfo;
  const options = [2, 3, 4, 5, 6].map((value) => {
    return (
      <option style={{ fontSize: "14px" }} value={value} key={value}>
        {value} x {value}{" "}
      </option>
    );
  });

  const changeOption = (event) => {
    dispatcher({ type: "length", data: event.target.value });
  };

  const restart = () => {
    dispatcher({ type: "start" });
  };

  return (
    <div>
      大小:{" "}
      <select value={length} onChange={(value) => changeOption(value)}>
        {options}
      </select>
      {current >= 0 ? (
        <button style={{ marginLeft: "10px" }} onClick={() => restart()}>
          {" "}
          重新开始{" "}
        </button>
      ) : null}
    </div>
  );
}
