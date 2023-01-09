import { ResultComponent } from './types.js';
import { CommandComponent } from './types.js';

function computeTotal(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
) {
  const Inputs = [
    ...inputsContainer.querySelectorAll<HTMLInputElement>(
      'input[type="number"]',
    ),
  ];
  const total = Inputs.reduce((carry, elem) => carry + Number(elem.value), 0);

  resultComponent.value = `${total}`;
}

function rebuildIndex(inputsContainer: HTMLElement) {
  const inputContainers = [
    ...inputsContainer.querySelectorAll<HTMLElement>('.cmp-input-container'),
  ];

  inputContainers.forEach((inputsContainer, index) => {
    [...inputsContainer.querySelectorAll<HTMLElement>('.cmp-input-no')].forEach(
      (elem) => {
        elem.innerText = `${index + 1}`;
      },
    );
  });

  [
    ...inputsContainer.querySelectorAll<CommandComponent>('.cmd-remove-input'),
  ].forEach((elem) => {
    elem.disabled = !(inputContainers.length > 1);
  });
}

function add(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  template: HTMLTemplateElement,
) {
  const fragment = template.content.cloneNode(true);

  inputsContainer.append(fragment);

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

function remove(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  inputContainer: HTMLElement,
) {
  inputContainer.remove();

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

export function assign(
  inputSection: HTMLElement,
  inputTemplate: HTMLTemplateElement,
) {
  const inputsContainer = inputSection.querySelector<HTMLElement>(
    '.cmp-inputs-container',
  );
  const resultComponent =
    inputSection.querySelector<ResultComponent>('.cmp-result');

  if (inputsContainer === null) {
    throw new Error(
      `Cannot find '.cmp-inputs-container' in Container DOM Tree`,
    );
  }

  if (resultComponent === null) {
    throw new Error(`Cannot find '.cmp-result' in Container DOM Tree`);
  }

  inputSection.addEventListener('click', (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches('.cmd-add-input')) {
        add(inputsContainer, resultComponent, inputTemplate);
      }
    }
  });

  inputsContainer.addEventListener('change', (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches('input[type="number"]')) {
        computeTotal(inputsContainer, resultComponent);
      }
    }
  });

  inputsContainer.addEventListener('click', (ev) => {
    if (ev.target) {
      const targetElement = ev.target as HTMLElement;
      if (targetElement.matches('.cmd-remove-input')) {
        const inputContainer = targetElement.closest<HTMLElement>(
          '.cmp-input-container',
        );
        if (inputContainer === null) {
          throw new Error(
            `Cannot find '.cmp-input-container' in Container DOM Tree`,
          );
        }
        remove(inputsContainer, resultComponent, inputContainer);
      }
    }
  });

  add(inputsContainer, resultComponent, inputTemplate);
}
