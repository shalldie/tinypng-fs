import fs from 'fs';
import path from 'path';
import rq from 'request';
import { TinypngResponse, TinypngDirResult } from './types';
import upload from './upload';
import * as _ from './lib/utils';

/**
 * 压缩某个图片
 *
 * @export
 * @param {string} imgSrc 图片源文件地址
 * @param {string} imgTo 图片压缩后要保存的地址
 * @returns {Promise<TinypngDirResult>}
 */
export default async function minifyFile(imgSrc: string, imgTo: string): Promise<TinypngDirResult> {
    // 上传图片
    const tinyInfo = await upload(imgSrc);
    // 创建目录
    _.mkdirp(path.dirname(imgTo));
    // 下载图片
    return new Promise<TinypngDirResult>((resolve, reject) => {
        const writeStream = fs.createWriteStream(imgTo);
        rq(tinyInfo.output.url).pipe(writeStream).on('error', reject);
        writeStream.on('finish', () => resolve({
            ...tinyInfo,
            imgSrc,
            imgTo
        }));
    });
}
