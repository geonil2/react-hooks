let states: any = [];
let cursor: number = 0;

function useState<S>(initialState: S) {
    if (states.length === cursor) {
        states.push(initialState);
    }

    const state = states[cursor];
    function setState(newState: S) {
        state[cursor] = newState;
        render();
    }

    cursor++;
    return [state, setState];
}

function app() {
    return myComponent();

}

function myComponent() {
    const [count, setCount] = useState(1);

    window['increment'] = () => setCount(count + 1);

    return `
        <div>
          <strong>count: ${count} </strong>
          <button onclick="increment()">증가</button>
        </div>
      `;
}

function render() {
    const root = document.querySelector('#root')!;
    root.innerHTML = app();
}

render();