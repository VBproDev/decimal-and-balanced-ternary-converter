import { balancedTernaryToDecimal, decimalToBalancedTernary } from "./utils";

self.onmessage = (e: MessageEvent) => {
  const { range, numSys } = e.data as { range: [string, string], numSys: string };

  let decimalNums: number[] = [];

  if (numSys === "balanced-ternary") {

    for (let i = Number(range[0]); i <= Number(range[1]); i++) {
      decimalNums.push(i);
    }

    self.postMessage(decimalNums.map((num) => decimalToBalancedTernary(num)));
  }

  else {
    
    for (let i = balancedTernaryToDecimal(range[0]); i <= balancedTernaryToDecimal(range[1]); i++) {
      decimalNums.push(i);
    }

    self.postMessage(decimalNums);
  }

};