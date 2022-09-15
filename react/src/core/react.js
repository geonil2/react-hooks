import { debounceFrame } from "../utils/debounceFrame.js";
function react() {
    const options = {
        states: [],
        currentStateCursor: 0,
        renderCount: 0,
        root: null,
        rootComponent: null,
    };
    function useState(initialState) {
        const { currentStateCursor: cursor, states } = options;
        if (states.length === cursor)
            states.push(initialState);
        const state = states[cursor];
        const setState = (newState) => {
            if (newState === state)
                return;
            states[cursor] = newState;
            _render();
        };
        options.currentStateCursor += 1;
        return [state, setState];
    }
    const _render = debounceFrame(() => {
        const { root, rootComponent } = options;
        if (!root || !rootComponent)
            return;
        console.log(rootComponent);
        root.innerHTML = rootComponent();
        options.currentStateCursor = 0;
        options.renderCount += 1;
    });
    const render = (rootComponent, root) => {
        options.rootComponent = rootComponent;
        options.root = root;
        _render();
    };
    return { useState, render };
}
export const { useState, render } = react();
