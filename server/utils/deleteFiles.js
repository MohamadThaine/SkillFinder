const fs = require('fs');

const deleteFiles = (folderPath, newFile) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }
    
        files.forEach((file) => {
          const filePath = `${folderPath}/${file}`;
          if(file === newFile) {
            return;
          }
          fs.unlink(filePath, (error) => {
            if (error) {
              return;
            }
          });
        });
      });
}

module.exports = deleteFiles;