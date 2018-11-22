import fs from 'fs';
import path from 'path';
import rq from 'request';
import rp from 'request-promise';
import parallelLimit from './lib/parallelLimit';
import * as _ from './lib/utils';
import { TinypngResponse } from './types';
import minifyFile from './minifyFile';

/**
 * 压缩目录内所有 jpg/jpeg/png 图片
 *
 * @param {string} dirSrc 要压缩的目录
 * @param {string} dirTo 压缩后的目标路径
 * @param {number} [parallelNumber=5] 最大并发量
 */
async function minifyDir(dirSrc: string, dirTo: string, parallelNumber: number = 5) {
    // 创建目标路径
    _.mkdirp(dirTo);

    const imgs = _.getAllImages(dirSrc);

    parallelLimit(imgs.map(imgSrc => {
        return function () {
            const relativePath = path.relative(dirSrc, imgSrc);
            const imgTo = path.join(dirTo, relativePath);
            return minifyFile(imgSrc, imgTo);
        };
    }), 5);
}
