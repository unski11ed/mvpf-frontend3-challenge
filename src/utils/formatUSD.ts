const intlFormatter = new Intl.NumberFormat('en-GB');

export default (amount: number) =>
  `${intlFormatter.format(Math.round(amount))} USD`;
