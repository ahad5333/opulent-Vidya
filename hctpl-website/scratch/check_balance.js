const fs = require('fs');
const content = fs.readFileSync('c:/Users/ahad5/OneDrive/Desktop/HCTPL/hctpl-website/src/components/ChatWidget.tsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 0; i < 442; i++) {
  const line = lines[i];
  if (!line) continue;
  for (let char of line) {
    if (char === '{') balance++;
    if (char === '}') balance--;
  }
  if (balance < 0) {
    console.log(`Balance went negative at line ${i + 1}: ${balance}`);
  }
}
console.log(`Final balance at line 442: ${balance}`);
