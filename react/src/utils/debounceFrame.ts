export const debounceFrame = (callback: FrameRequestCallback) => {
    let nextFrameCallback = -1;
    return () => {
        cancelAnimationFrame(nextFrameCallback);
        nextFrameCallback = requestAnimationFrame(callback)
    }
};