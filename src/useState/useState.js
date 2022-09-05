// type SetStateAction<s> = s | ((prevState: s) =>s);
// type Dispatch<A> = (value: A) => void;
// function useState<s>(initialState: s | (() => s)): [s, Dispatch<SetStateAction<s>>];
// state를 변수로 선언했더니 useState에서 return한 순간 변경할 수 없는 상태가 되서 setState가 이루어지지 않는다.
function useState(initialState) {
    var value = initialState;
    // const state = () => value;
    var setState = function (newState) {
        value = newState;
    };
    return [value, setState];
}
var _a = useState(0), number = _a[0], setNumber = _a[1];
console.log(number);
setNumber(1);
console.log(number);
