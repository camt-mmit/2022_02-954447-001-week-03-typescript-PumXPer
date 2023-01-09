import { assign as assignInput } from './section.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector<HTMLElement>(
    '.cmp-main-container',
  );
  const sectionTemplate =
    document.querySelector<HTMLTemplateElement>('#tmp-section');
  const inputTemplate =
    document.querySelector<HTMLTemplateElement>('#tmp-input');

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
