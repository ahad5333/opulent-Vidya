const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function generateCommitData() {
  try {
    // Get all commits with branch info
    // Format: hash|authorName|authorEmail|date|subject|refNames
    const logOutput = execSync(
      'git log --pretty=format:"%H|%an|%ae|%ad|%s|%D" --date=iso'
    ).toString();

    const commits = logOutput.split('\n').filter(line => line.trim()).map(line => {
      const [hash, authorName, authorEmail, date, message, refs] = line.split('|');
      
      // Extract branch names from refs
      let branch = 'main';
      if (refs) {
        const branchMatches = refs.match(/(HEAD -> |origin\/)([^,)]+)/g);
        if (branchMatches) {
          branch = branchMatches[0].replace('HEAD -> ', '').replace('origin/', '').trim();
        }
      }

      return {
        hash: hash.substring(0, 7),
        fullHash: hash,
        author: authorName,
        email: authorEmail,
        date: date,
        message: message,
        branch: branch
      };
    });

    // Get unique authors
    const authors = [...new Set(commits.map(c => c.author))].sort();

    // Get unique branches
    const branchesOutput = execSync('git branch -a').toString();
    const branches = branchesOutput
      .split('\n')
      .map(b => b.replace('*', '').replace('remotes/origin/', '').trim())
      .filter(b => b && !b.includes('->'))
      .filter((v, i, a) => a.indexOf(v) === i); // Unique

    // Write files
    fs.writeFileSync(path.join(DATA_DIR, 'commits.json'), JSON.stringify(commits, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'authors.json'), JSON.stringify(authors, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'branches.json'), JSON.stringify(branches, null, 2));

    console.log('Successfully generated commit data in src/data/');
  } catch (error) {
    console.error('Error generating commit data:', error.message);
  }
}

generateCommitData();
