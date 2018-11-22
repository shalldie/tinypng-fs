import fs from 'fs';
import path from 'path';

/**
 * 创建（多层级）目录
 *
 * @export
 * @param {string} dirPath
 */
export function mkdirp(dirPath: string) {
    const dirs = dirPath.split(path.sep);

    let currentPath = dirs.shift();
    while (dirs.length) {
        currentPath += path.sep + dirs.shift();

        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    }
};

/**
 * 获取文件夹内所有图片
 *
 * @export
 * @param {string} dirPath 目录路径
 * @returns {Array<string>}
 */
export function getAllImages(dirPath: string): Array<string> {
    let result = [];
    const files = fs.readdirSync(dirPath);

    for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i];
        const statu = fs.statSync(path.join(dirPath, file));

        if (statu.isFile()) {
            (/\.(jpg|jpeg|png)$/i).test(path.extname(file)) && result.push(path.join(dirPath, file));
        }

        if (statu.isDirectory()) {
            result = result.concat(exports.getAllImages(path.join(dirPath, file)));
        }
    }
    return result;
};
