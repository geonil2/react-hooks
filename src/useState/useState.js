/**
 * React Module
 */
var ReactCurrentDispatcher = { current: null };
function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;
    if (dispatcher === null) {
        console.error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
    }
    return dispatcher;
}
function useState(initialState) {
    var dispatcher = resolveDispatcher();
    //@ts-ignore
    return dispatcher.useState(initialState); // [state, setState] 형태
}
/**
 * New useState
 */
// state를 변수로 선언했더니 useState에서 return한 순간 변경할 수 없는 상태가 되서 setState가 이루어지지 않는다.
// state를 함수(const state = () => value)로 만들어서 해결했으나 react는 state를 useState 외부에 선언해서 해결한다.
// 이를 클로저로 구현하여 useState를 사용한 함수(Component)가 외부 스코프에서 관리되어 있는 state(ReactCurrentDispatcher)와의 비교를 통해 Rerender 여부를 파악 가능하다.
var allState = [];
var setters = [];
var cursor = 0;
var first = true;
function createSetter(cursor) {
    return function setterWithCursor(newState) {
        allState[cursor] = newState;
    };
}
function myUseState(initialState) {
    // if (first) {
    allState.push(initialState);
    setters.push(createSetter(cursor));
    first = false;
    // }
    var setState = setters[cursor]; // function setterWithCursor(newState)
    var state = allState[cursor];
    cursor++;
    return [state, setState];
}
/**
 * Test
 */
var _a = myUseState(0), number = _a[0], setNumber = _a[1];
var _b = myUseState('geonil'), user = _b[0], setUser = _b[1];
console.log(allState, setters, cursor, first);
console.log(number);
setNumber(number + 1);
console.log(allState, setters, cursor, first);
console.log(allState, setters, cursor, first);
console.log(user);
console.log(number);
