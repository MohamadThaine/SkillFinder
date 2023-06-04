const fs = require('fs');
const deleteFiles = (folderPath, fileName) => {
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        files.forEach(file => {
            if (file === fileName) {
                fs.unlinkSync(`${folderPath}/${file}`);
            }
        });
    }
}

module.exports = deleteFiles;