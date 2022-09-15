declare global {
    interface Window {
        increment: () => void;
        decrement: () => void;
    }
}

type ReactOptions= {
    states: any[],
    currentStateCursor: number,
    renderCount: number,
    root: any,
    rootComponent: any,
}

export { ReactOptions};
