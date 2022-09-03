// type SetStateAction<s> = s | ((prevState: s) =>s);
// type Dispatch<A> = (value: A) => void;
// function useState<s>(initialState: s | (() => s)): [s, Dispatch<SetStateAction<s>>];

function useState<S>(initialState: S): [() => S, (newState: S) => void] {
    let value = initialState;

    const state = () => value;
    // state를 변수로 선언했더니 useState에서 return한 순간 변경할 수 없는 상태가 되서 setState가 이루어지지 않는다.

    const setState = (newState: S) => {
        value = newState
    }

    return [state, setState];
}

const [number, setNumber] = useState(0);
console.log(number());
setNumber(1);
console.log(number());