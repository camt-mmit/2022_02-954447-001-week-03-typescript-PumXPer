document.addEventListener('DOMContentLoaded', () => {
  const inputs = [
    ...document.querySelectorAll<HTMLInputElement>(
      '.cmp-inputs-container input[type="number"]',
    ),
  ];

  inputs.forEach((elem) => {
    elem.addEventListener('change', () => {
      const total = inputs.reduce((carry, em) => carry + em.valueAsNumber, 0);

      const outputComponant =
        document.querySelector<HTMLOutputElement>('output.cmp-result');

      if (outputComponant === null) {
        throw new Error("Cannot find 'output.cmp-result' in DOM Tree");
      }

      outputComponant.value = `${total}`;
      //   document.querySelector('output.cmp-result').value = total;
    });
  });
});
