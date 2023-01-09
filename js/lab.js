import { assign as assignInput } from './section.js';
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.cmp-main-container');
    const sectionTemplate = document.querySelector('#tmp-section');
    const inputTemplate = document.querySelector('#tmp-input');
    if (mainContainer === null) {
        throw new Error(`Cannot find '.cmp-main-container' in Container DOM Tree`);
    }
    if (sectionTemplate === null) {
        throw new Error(`Cannot find '#tmp-section' in Container DOM Tree`);
    }
    if (inputTemplate === null) {
        throw new Error(`Cannot find '#tmp-input' in Container DOM Tree`);
    }
    assignInput(mainContainer, sectionTemplate, inputTemplate);
});
