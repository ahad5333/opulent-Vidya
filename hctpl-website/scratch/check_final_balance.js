const fs = require('fs');
const content = fs.readFileSync('c:/Users/ahad5/OneDrive/Desktop/HCTPL/hctpl-website/src/components/ChatWidget.tsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let char of line) {
    if (char === '{') balance++;
    if (char === '}') balance--;
  }
}
console.log(`Final balance at end of file: ${balance}`);
