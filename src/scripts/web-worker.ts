import { balancedTernaryToDecimal, decimalToBalancedTernary } from "./utils";

self.onmessage = (e: MessageEvent) => {
  const { range, numSys } = e.data as { range: [string, string], numSys: string };

  let decimalNums: number[] = [];

  for (let i = Number(range[0]); i <= Number(range[1]); i++) {
    decimalNums.push(i);
  }

  if (numSys === "balanced-ternary") {
    self.postMessage(decimalNums.map((num) => decimalToBalancedTernary(num)));
  }
  
  else {
    self.postMessage(decimalNums);
  }

};