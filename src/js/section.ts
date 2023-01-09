import { assign as assignInput } from './input.js';
import { CommandComponent } from './types.js';

function rebuildIndex(sectionsContainer: HTMLElement) {
  const inputSections = [
    ...sectionsContainer.querySelectorAll<HTMLElement>('.cmp-input-section'),
  ];

  inputSections.forEach((elem, i) => {
    [...elem.querySelectorAll<HTMLElement>('.cmp-section-no')].forEach(
      (elem) => {
        elem.innerText = `${i + 1}`;
      },
    );
  });

  [
    ...sectionsContainer.querySelectorAll<CommandComponent>(
      '.cmd-remove-section',
    ),
  ].forEach((elem) => {
    elem.disabled = !(inputSections.length > 1);
  });
}

function remove(sectionsContainer: HTMLElement, delectSection: HTMLElement) {
  delectSection.remove();

  rebuildIndex(sectionsContainer);
}

function add(
  sectionsContainer: HTMLElement,
  sectionTemplate: HTMLTemplateElement,
  inputTemplate: HTMLTemplateElement,
) {
  const fragment = sectionTemplate.content.cloneNode(true) as DocumentFragment;
  const inputSection =
    fragment.querySelector<HTMLElement>('.cmp-input-section');

  sectionsContainer.append(fragment);

  if (inputSection === null) {
    throw new Error(`Cannot find '.cmp-input-section' in Container DOM Tree`);
  }
  rebuildIndex(sectionsContainer);
  assignInput(inputSection, inputTemplate);
}

export function assign(
  mainContainer: HTMLElement,
  sectionTemplate: HTMLTemplateElement,
  inputTemplate: HTMLTemplateElement,
) {
  const sectionsContainer = mainContainer.querySelector<HTMLElement>(
    '.cmp-sections-container',
  );

  if (sectionsContainer === null) {
    throw new Error(
      `Cannot find '.cmp-sections-container' in Container DOM Tree`,
    );
  }

  mainContainer.addEventListener('click', (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches('.cmd-add-section')) {
        add(sectionsContainer, sectionTemplate, inputTemplate);
      }
    }
  });

  mainContainer.addEventListener('click', (ev) => {
    if (ev.target) {
      const targetElement = ev.target as HTMLElement;
      if (targetElement.matches('.cmd-remove-section')) {
        const delectSection = targetElement.closest('.cmp-input-section');

        remove(sectionsContainer, delectSection as HTMLElement);
      }
    }
  });

  add(sectionsContainer, sectionTemplate, inputTemplate);
}
