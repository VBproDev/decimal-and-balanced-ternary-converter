import { decimalToBalancedTernary, balancedTernaryToDecimal } from "./utils";
import WorkerURL from './web-worker?worker&url';

const webWorker = new Worker(WorkerURL, { type: 'module' });
const num = document.querySelector(".numeric-input") as HTMLInputElement;
const base = document.querySelector(".numeric-base-select")!;
const outputArea = document.querySelector(".conversion-result")!;
const errorBanner = document.getElementById("error-banner")!;
const convertBtn = document.querySelector(".convert-btn")!;
const copyBtn = document.querySelector(".copy-btn")!;
const successBanner = document.getElementById("success-banner")!;
const downloadBtn = document.querySelector(".download-btn")!;

function setLoadingUI() {
  successBanner.setAttribute("aria-live", "polite");
  successBanner.classList.remove("disabled-banner");
  successBanner.classList.add("active-success");
  successBanner.innerText = "Calculating...";
}

function cleanLoadingUI() {
  successBanner.classList.remove("active-success");
  successBanner.classList.add("disabled-banner");
  successBanner.removeAttribute("aria-live");
  successBanner.innerText = '';
}

function raiseError(userMsg: string, logMsg: string) {
  errorBanner.setAttribute("aria-live", "assertive");
  errorBanner.classList.remove("disabled-banner");
  errorBanner.classList.add("active-error");
  errorBanner.innerText = userMsg;

  setTimeout(() => {
    errorBanner.classList.remove("active-error");
    errorBanner.classList.add("disabled-banner");
    errorBanner.removeAttribute("aria-live");
    errorBanner.innerText = '';
  }, 2000);

  throw new Error(logMsg);
}

async function successHandling(userMsg: string): Promise<void> {
  successBanner.setAttribute("aria-live", "polite");
  successBanner.classList.remove("disabled-banner");
  successBanner.classList.add("active-success");
  successBanner.innerText = userMsg;

  await new Promise(resolve => setTimeout(resolve, 2000));

  successBanner.classList.remove("active-success");
  successBanner.classList.add("disabled-banner");
  successBanner.removeAttribute("aria-live");
  successBanner.innerText = '';
}

async function convertBtnHandler() {
  const n = num.value.replace(/\s+/g, '');
  let numBase = (base as HTMLInputElement).value.toLowerCase();
  let decimalNums: number[] = [];

  if (numBase === "balanced-ternary") {
    const numN = Number(n);

    if (/\d+,\d+/.test(n)) {
      const range = n.split(',').map(x => Number(x)).sort((a, b) => a - b);

      if (range[1] - range[0] > 150000) {

        setLoadingUI();

        webWorker.onmessage = (event) => {
          outputArea.innerHTML = event.data.join(" ");
          cleanLoadingUI();
          successHandling("Done!");
        };

        webWorker.postMessage({ range, numSys: numBase });
      } else {

        for (let i = range[0]; i <= range[1]; i++) {
          decimalNums.push(i);
        }

        outputArea.innerHTML = decimalNums.map((x) => decimalToBalancedTernary(x)).join(" ");
        successHandling("Done!");
      }
    } else if (isNaN(numN)) {
      raiseError("Input should be a decimal!", `Input was '${numN}'. Base was ${numBase}. The program has identified the input as not purely numeric.`);
    } else {
      outputArea.innerHTML = decimalToBalancedTernary(numN);
      successHandling("Done!");
    }
  } else {
    if (/[T10]+,[T10]+/.test(n)) {
      const range = n.split(',').map(x => balancedTernaryToDecimal(x)).sort((a, b) => a - b);

      if (range[1] - range[0] > 500000) {

        setLoadingUI();

        webWorker.onmessage = (event) => {
          outputArea.innerHTML = event.data.join(" ");
          cleanLoadingUI();
          successHandling("Done!");
        };

        webWorker.postMessage({ range, numSys: numBase });
      }
      else {
        for (let i = range[0]; i <= range[1]; i++) {
          decimalNums.push(i);
        }
        outputArea.innerHTML = decimalNums.join(" ");
        successHandling("Done!");
      }
    }
    else if (/[T10]+/.test(n)) {
      outputArea.innerHTML = balancedTernaryToDecimal(n).toString();
      successHandling("Done!");
    }
    else {
      raiseError("Input should be a balanced ternary number!", `Input was '${n}'. Base was ${numBase}. The program has identified the input as not purely using the characters 'T' , '0' and '1'.`);
    }
  }
}


function copyResults() {
  navigator.clipboard.writeText(outputArea.innerHTML);
  successHandling("Copied to clipboard!");
}

function downloadResults() {
  const url = URL.createObjectURL(new Blob([outputArea.innerHTML], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = 'results.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url)
}

convertBtn.addEventListener("click", () => convertBtnHandler());
convertBtn.addEventListener("keydown", (event) => {

  if ((event as KeyboardEvent).key === 'Enter' || (event as KeyboardEvent).key === ' ') {
    convertBtnHandler();
  }

});

copyBtn.addEventListener("click", () => {

  if (outputArea.innerHTML.length > 500000) {
    raiseError("Output this large can only be downloaded!", `Output is ${outputArea.innerHTML.length} characters long. The program has identified the output as too large to be copied to the clipboard.`);
  }
  
  copyResults();
});

copyBtn.addEventListener("keydown", (event: Event) => {

  if (outputArea.innerHTML.length > 500000) {
    raiseError("Output this large can only be downloaded!", `Output is ${outputArea.innerHTML.length} characters long. The program has identified the output as too large to be copied to the clipboard.`);
  }

  if ((event as KeyboardEvent).key === 'Enter' || (event as KeyboardEvent).key === ' ') {
    copyResults();
  }

});

base.addEventListener("change", (e) => {
  if ((base as HTMLInputElement).value.toLowerCase() === "balanced-ternary") num.placeholder = "Enter decimal";
  else num.placeholder = "Enter balanced ternary";
});

downloadBtn.addEventListener("click", downloadResults)

downloadBtn.addEventListener("keydown", (event: Event) => {

  if ((event as KeyboardEvent).key === 'Enter' || (event as KeyboardEvent).key === ' ') {
    downloadResults();
  }

});