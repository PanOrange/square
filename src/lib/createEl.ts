export const createEl = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] => {
    return document.createElement(tagName);
};
