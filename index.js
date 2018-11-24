const fs = require('fs');
const path = require('path');

const tinypng = require('./build/index');

// tinypng.minifiyFile(path.join(__dirname, 'head.jpg'), path.join(__dirname, 'test/b/c/d/head.jpg'));

(async () => {
    // const result = await tinypng.upload(path.join(__dirname, 'test/a/a.png'));
    // console.log(result);
    // console.log(result.output.url);
    // const result = await tinypng.minifyDir(path.join(__dirname, 'test/a'), path.join(__dirname, 'test/new_a'), 1);
    // console.log(JSON.stringify(result, null, '    '));

    const result = await tinypng.upload('');
    result.
})();
