const testFolder = 'D:/';
const fs = require('fs');
filesArray = ''

// reaches the folder, enumerate how many files, then store into the variable
fs.readdirSync(testFolder).forEach(file => {
  filesArray.push(file)
});


// use the variable to start scraping
for (let file = 0; file < filesArray.length; file++) {
  const currentLoopedFile = filesArray[file]

  
}