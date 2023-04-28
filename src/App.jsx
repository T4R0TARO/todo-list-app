import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  console.log(count);

  function countClick() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <h1>TODO LIST APP</h1>
      <button onClick={countClick}>Count</button>
    </>
  );
}

export default App;
