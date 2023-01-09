import { assign as assignInput } from './input.js';
function rebuildIndex(sectionsContainer) {
    const inputSections = [
        ...sectionsContainer.querySelectorAll('.cmp-input-section'),
    ];
    inputSections.forEach((elem, i) => {
        [...elem.querySelectorAll('.cmp-section-no')].forEach((elem) => {
            elem.innerText = `${i + 1}`;
        });
    });
    [
        ...sectionsContainer.querySelectorAll('.cmd-remove-section'),
    ].forEach((elem) => {
        elem.disabled = !(inputSections.length > 1);
    });
}
function remove(sectionsContainer, delectSection) {
    delectSection.remove();
    rebuildIndex(sectionsContainer);
}
function add(sectionsContainer, sectionTemplate, inputTemplate) {
    const fragment = sectionTemplate.content.cloneNode(true);
    const inputSection = fragment.querySelector('.cmp-input-section');
    sectionsContainer.append(fragment);
    if (inputSection === null) {
        throw new Error(`Cannot find '.cmp-input-section' in Container DOM Tree`);
    }
    rebuildIndex(sectionsContainer);
    assignInput(inputSection, inputTemplate);
}
export function assign(mainContainer, sectionTemplate, inputTemplate) {
    const sectionsContainer = mainContainer.querySelector('.cmp-sections-container');
    if (sectionsContainer === null) {
        throw new Error(`Cannot find '.cmp-sections-container' in Container DOM Tree`);
    }
    mainContainer.addEventListener('click', (ev) => {
        if (ev.target) {
            if (ev.target.matches('.cmd-add-section')) {
                add(sectionsContainer, sectionTemplate, inputTemplate);
            }
        }
    });
    mainContainer.addEventListener('click', (ev) => {
        if (ev.target) {
            const targetElement = ev.target;
            if (targetElement.matches('.cmd-remove-section')) {
                const delectSection = targetElement.closest('.cmp-input-section');
                remove(sectionsContainer, delectSection);
            }
        }
    });
    add(sectionsContainer, sectionTemplate, inputTemplate);
}
