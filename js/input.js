function computeTotal(inputsContainer, resultComponent) {
    const Inputs = [
        ...inputsContainer.querySelectorAll('input[type="number"]'),
    ];
    const total = Inputs.reduce((carry, elem) => carry + Number(elem.value), 0);
    resultComponent.value = `${total}`;
}
function rebuildIndex(inputsContainer) {
    const inputContainers = [
        ...inputsContainer.querySelectorAll('.cmp-input-container'),
    ];
    inputContainers.forEach((inputsContainer, index) => {
        [...inputsContainer.querySelectorAll('.cmp-input-no')].forEach((elem) => {
            elem.innerText = `${index + 1}`;
        });
    });
    [
        ...inputsContainer.querySelectorAll('.cmd-remove-input'),
    ].forEach((elem) => {
        elem.disabled = !(inputContainers.length > 1);
    });
}
function add(inputsContainer, resultComponent, template) {
    const fragment = template.content.cloneNode(true);
    inputsContainer.append(fragment);
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
function remove(inputsContainer, resultComponent, inputContainer) {
    inputContainer.remove();
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
export function assign(inputSection, inputTemplate) {
    const inputsContainer = inputSection.querySelector('.cmp-inputs-container');
    const resultComponent = inputSection.querySelector('.cmp-result');
    if (inputsContainer === null) {
        throw new Error(`Cannot find '.cmp-inputs-container' in Container DOM Tree`);
    }
    if (resultComponent === null) {
        throw new Error(`Cannot find '.cmp-result' in Container DOM Tree`);
    }
    inputSection.addEventListener('click', (ev) => {
        if (ev.target) {
            if (ev.target.matches('.cmd-add-input')) {
                add(inputsContainer, resultComponent, inputTemplate);
            }
        }
    });
    inputsContainer.addEventListener('change', (ev) => {
        if (ev.target) {
            if (ev.target.matches('input[type="number"]')) {
                computeTotal(inputsContainer, resultComponent);
            }
        }
    });
    inputsContainer.addEventListener('click', (ev) => {
        if (ev.target) {
            const targetElement = ev.target;
            if (targetElement.matches('.cmd-remove-input')) {
                const inputContainer = targetElement.closest('.cmp-input-container');
                if (inputContainer === null) {
                    throw new Error(`Cannot find '.cmp-input-container' in Container DOM Tree`);
                }
                remove(inputsContainer, resultComponent, inputContainer);
            }
        }
    });
    add(inputsContainer, resultComponent, inputTemplate);
}
