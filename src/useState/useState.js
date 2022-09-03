// type SetStateAction<s> = s | ((prevState: s) =>s);
// type Dispatch<A> = (value: A) => void;
// function useState<s>(initialState: s | (() => s)): [s, Dispatch<SetStateAction<s>>];
function useState(initialState) {
    var value = initialState;
    var state = function () { return value; };
    var setState = function (newState) {
        value = newState;
    };
    return [state, setState];
}
var _a = useState(0), number = _a[0], setNumber = _a[1];
console.log(number());
setNumber(1);
console.log(number());
