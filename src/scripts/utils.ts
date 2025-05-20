function balancedTernaryToDecimal(num: string): number {
  let decimal = 0;

  for (let i = 0; i < num.length; i++) {
    decimal = decimal * 3 + (num[i] === 'T' ? -1 : parseInt(num[i]));
  }

  return decimal;
}

function decimalToBalancedTernary(decimal: number): string {
  if (decimal === 0) return '0';

  let result = '';

  while (decimal !== 0) {

    if (((decimal % 3) + 3) % 3 === 0) {
      result = '0' + result;
    } else if (((decimal % 3) + 3) % 3 === 1) {
      result = '1' + result;
      decimal -= 1;
    } else {
      result = 'T' + result;
      decimal += 1;
    }

    decimal = Math.floor(decimal / 3);
  }

  return result;
}

export { balancedTernaryToDecimal, decimalToBalancedTernary };