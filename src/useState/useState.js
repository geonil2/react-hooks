function useState(initialState) {
}
function app() {
    return myComponent();
}
function myComponent() {
    var _a = myUseState(1), number = _a[0], setNumber = _a[1];
    return "\n        <div>\n          <button>hello</button>\n        </div>\n    ";
}
function render() {
    var root = document.querySelector('#root');
    root.innerHTML = app();
}
