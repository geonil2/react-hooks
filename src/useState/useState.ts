
function useState<S>(initialState: S) {

}

function app() {
    return myComponent();

}

function myComponent() {
    const [number, setNumber] = myUseState(1);
    return `
        <div>
          <button>hello</button>
        </div>
    `;
}

function render() {
    const root = document.querySelector('#root');
    root.innerHTML = app();
}