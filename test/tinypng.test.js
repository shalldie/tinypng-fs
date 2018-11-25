const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const tinypng = require('../build');

function ifExits(pathToCheck) {
    const status = fs.statSync(pathToCheck);
    return status && status.isFile();
}

describe('test tinypng:', function () {

    beforeEach(function () {
        shelljs.rm('-rf', 'test/new_a');
    });

    afterEach(function () {
        shelljs.rm('-rf', 'test/new_a');
    });

    it('upload', function () {
        return tinypng.upload(path.join(__dirname, 'a/a.png'));
    });

    it('minifyFile', function (next) {
        (async () => {
            const result = await tinypng.minifiyFile(path.join(__dirname, 'a/a.png'), path.join(__dirname, 'new_a/a.png'));

            if (ifExits(path.join(__dirname, 'new_a/a.png'))) {
                next();
                return;
            }
            next('minifyFile failed.');
        })();
    });

    it('minifyDir', async function () {
        const result = await tinypng.minifyDir(path.join(__dirname, 'a'), path.join(__dirname, 'new_a'));
        for (let item of result) {
            if (!ifExits(item.imgTo)) {
                return Promise.reject('has no file.');
            }
        }
    });

});
