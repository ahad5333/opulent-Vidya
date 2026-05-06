const fs = require('fs');
const content = fs.readFileSync('c:/Users/ahad5/OneDrive/Desktop/HCTPL/hctpl-website/src/components/ChatWidget.tsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 0; i < 450; i++) {
  const line = lines[i];
  if (line === undefined) break;
  for (let char of line) {
    if (char === '{') balance++;
    if (char === '}') balance--;
  }
  if (line.includes('queryGemini') || line.includes('return') || (i >= 350 && i <= 360) || (i >= 435 && i <= 445)) {
    console.log(`${i + 1}: ${balance} | ${line.trim()}`);
  }
}
