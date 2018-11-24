import path from 'path';
import * as _ from './lib/utils';
import { TinypngDirResult } from './types';
import minifyFile from './minifyFile';

/**
 * 压缩目录内所有 jpg/jpeg/png 图片
 *
 * @exports
 * @param {string} dirSrc 要压缩的目录
 * @param {string} dirTo 压缩后的目标路径
 * @returns {Promise<Array<TinypngDirResult>>}
 */
export default async function minifyDir(dirSrc: string, dirTo: string): Promise<Array<TinypngDirResult>> {
    const result: TinypngDirResult[] = [];
    // 创建目标路径
    _.mkdirp(dirTo);

    const imgs = _.getAllImages(dirSrc);

    for (let i = 0, len = imgs.length; i < len; i++) {
        const imgSrc = imgs[i];
        const relativePath = path.relative(dirSrc, imgSrc);
        const imgTo = path.join(dirTo, relativePath);
        const minifyResult = await minifyFile(imgSrc, imgTo);
        result.push({
            imgSrc,
            imgTo,
            ...minifyResult
        });
    }

    return result;
}
