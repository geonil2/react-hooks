import {debounceFrame} from "../utils/debounceFrame.js";
import {ReactOptions} from "../types.js";

function react () {
    const options: ReactOptions = {
        states: [],
        currentStateCursor: 0,
        renderCount: 0,
        root: null,
        rootComponent: null,
    }

    function useState<S>(initialState: S) {
        const { currentStateCursor: cursor, states } = options;
        if (states.length === cursor) states.push(initialState);

        const state = states[cursor];
        const setState = (newState: S) => {
            if (newState === state) return;
            states[cursor] = newState;
            _render();
        }

        options.currentStateCursor += 1;
        return [state, setState];
    }

    const _render = debounceFrame(() => {
        const { root, rootComponent } = options;
        if (!root || !rootComponent) return;
        console.log(rootComponent)
        root.innerHTML = rootComponent();
        options.currentStateCursor = 0;
        options.renderCount += 1;
    });

    const render = (rootComponent: any, root: any,) => {
        options.rootComponent = rootComponent;
        options.root = root;
        _render();
    }

    return { useState, render };
}

export const { useState, render } = react();