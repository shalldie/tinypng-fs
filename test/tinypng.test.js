const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const tinypng = require('../build');

function ifExits(pathToCheck, ifFile) {
    const status = fs.statSync(pathToCheck);
    if (!status) {
        return false;
    }
    if (ifFile) {
        return status.isFile();
    }
    return status.isDirectory();
}

describe('test tinypng.', function () {

    beforeEach(function () {
        shelljs.rm('-rf', 'test/new_a');
    });

    it('upload.', async function () {
        const result = await tinypng.upload(path.join(__dirname, 'a/a.png'))

        process.nextTick(() => console.log(`before minify:after minify  |   ${result.input.size / 1000}kb : ${result.output.size / 1000}kb`));
    });

    it('minifyFile', function (next) {
        (async () => {
            const result = await tinypng.minifiyFile(path.join(__dirname, 'a/a.png'), path.join(__dirname, 'new_a/a.png'));
            process.nextTick(() => console.log(`before minify:after minify  |   ${result.input.size / 1000}kb : ${result.output.size / 1000}/kb`));

            if (ifExits(path.join(__dirname, 'new_a/a.png'), true)) {
                next();
                return;
            }
            next('minifyFile failed.');
        })();
    });

    it('minifyDir', function (next) {
        (async () => {
            const result = await tinypng.minifyDir(path.join(__dirname, 'a'), path.join(__dirname, 'new_a'));
            for (let item of result) {
                process.nextTick(() => {
                    console.log(`${item.imgSrc}:    |   ${item.input.size / 1000}kb : ${item.output.size / 1000}/kb`);
                });
            }
            next();
        })();
    });

});
