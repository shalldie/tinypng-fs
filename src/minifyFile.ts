import fs from 'fs';
import path from 'path';
import rq from 'request';
import { TinypngResponse } from './types';
import upload from './upload';
import * as _ from './lib/utils';

/**
 * 压缩某个图片
 *
 * @export
 * @param {string} fileSrc 图片源文件地址
 * @param {string} fileTo 图片压缩后要保存的地址
 * @returns {Promise<TinypngResponse>}
 */
export default async function minifyFile(fileSrc: string, fileTo: string): Promise<TinypngResponse> {
    // 上传图片
    const tinyInfo = await upload(fileSrc);
    // 创建目录
    _.mkdirp(path.dirname(fileTo));
    // 下载图片
    return new Promise<TinypngResponse>((resolve, reject) => {
        const writeStream = fs.createWriteStream(fileTo);
        rq(tinyInfo.output.url).pipe(writeStream).on('error', reject);
        writeStream.on('finish', () => resolve(tinyInfo));
    });
}
