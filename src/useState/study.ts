/**
 * React module
 */
let ReactCurrentDispatcher = { current: null };

function resolveDispatcher() {
    let dispatcher = ReactCurrentDispatcher.current;

    if (dispatcher === null) {
        console.error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
    }

    return dispatcher;
}

function study<S>(initialState: S) {
    let dispatcher = resolveDispatcher();
    //@ts-ignore
    return dispatcher.useState(initialState); // [state, setState] 형태
}

/**
 * My useState
 */
// state를 변수로 선언했더니 useState에서 return한 순간 변경할 수 없는 상태가 되서 setState가 이루어지지 않는다.
// state를 함수(const state = () => value)로 만들어서 해결했으나 react는 state를 useState 외부에 선언해서 해결한다.
// 이를 클로저로 구현하여 useState를 사용한 함수(Component)가 외부 스코프에서 관리되어 있는 state(ReactCurrentDispatcher)와의 비교를 통해 Rerender 여부를 파악 가능하다.
let allState: any = [];
let setters: any = [];
let cursor = 0;
let first = true;

function createSetter(cursor: number) {
    return function setterWithCursor<S>(newState: S) {
        allState[cursor] = newState;
    }
}

function myUseState<S>(initialState: S): [S, (newState: S) => void] {
    if (setters.length === cursor) {
        allState.push(initialState);
        setters.push(createSetter(cursor));
        first = false;
    }

    const state = allState[cursor];
    const setState = setters[cursor]; // function setterWithCursor(newState)

    cursor++;
    return [state, setState];
}

/**
 * My component
 */
function App () {
    return myComponent();
}

function myComponent() {
    const [number, setNumber] = myUseState(1);
    setNumber(number + 1);
    return number; // number는 set 이전 값을 가지고 있음.
}

console.log(App());


