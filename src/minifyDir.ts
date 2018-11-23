import fs from 'fs';
import path from 'path';
import rq from 'request';
import rp from 'request-promise';
import parallelLimit from './lib/parallelLimit';
import * as _ from './lib/utils';
import { TinypngResponse, ParallelResult } from './types';
import minifyFile from './minifyFile';

/**
 * 压缩目录内所有 jpg/jpeg/png 图片
 *
 * @exports
 * @param {string} dirSrc 要压缩的目录
 * @param {string} dirTo 压缩后的目标路径
 * @param {number} [parallelNumber=5] 最大并发量
 * @returns {Promise<ParallelResult>}
 */
export default async function minifyDir(dirSrc: string, dirTo: string, parallelNumber: number = 5): Promise<ParallelResult> {
    // 创建目标路径
    _.mkdirp(dirTo);

    const imgs = _.getAllImages(dirSrc);

    return parallelLimit(imgs.map(imgSrc => () => {
        const relativePath = path.relative(dirSrc, imgSrc);
        const imgTo = path.join(dirTo, relativePath);
        return minifyFile(imgSrc, imgTo);
    }), parallelNumber);
}
