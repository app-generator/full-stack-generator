const fs = require('fs');
const path = require("path")

const ui = process.argv[2] || 'mui';

const uiPattern = RegExp(`^(.+)\.${ui}.(ts|tsx)$`,'g');
const ignorePattern = /(node_modules)/g

const processFiles = function (dirPath) {
    const files = fs.readdirSync(dirPath)

    files.forEach(function (file) {
        if (ignorePattern.test(file)) {
            return;
        }
        const fpath = path.resolve(dirPath, file);
        if (fs.statSync(fpath).isDirectory()) {
            processFiles(fpath);
            return;
        }
        const match = uiPattern.exec(file);
        if (!!match) {
            fs.copyFileSync(fpath, path.resolve(dirPath, `${match[1]}.${match[2]}`));
            console.log(`Processed ${fpath}`);
        }
    })
}

processFiles('.')