import { useState } from "../core/react.js";
const Count = () => {
    const [count, setCount] = useState(1);
    const [cat, setCat] = useState('짝! ');
    const countMeow = (newCount) => {
        setCount(newCount);
        setCat('짝! '.repeat(newCount));
    };
    window.increment = () => countMeow(count + 1);
    window.decrement = () => countMeow(count - 1);
    return `
        <div>
          <p>박수 ${count}번 시작! ${cat} </p>
          <button onclick="increment()">증가</button>
          <button onclick="decrement()">감소</button>
        </div>
    `;
};
export default Count;
