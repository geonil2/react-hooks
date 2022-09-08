var states = [];
var cursor = 0;
function useState(initialState) {
    if (states.length === cursor) {
        states.push(initialState);
    }
    var state = states[cursor];
    function setState(newState) {
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
    var _a = useState(1), count = _a[0], setCount = _a[1];
    window['increment'] = function () { return setCount(count + 1); };
    return "\n        <div>\n          <strong>count: ".concat(count, " </strong>\n          <button onclick=\"increment()\">\uC99D\uAC00</button>\n        </div>\n      ");
}
function render() {
    var root = document.querySelector('#root');
    root.innerHTML = app();
}
render();
