import fs from 'fs';
import rp from 'request-promise';
import { TinypngResponse } from './types';

/**
 * 上传文件到 tinypng
 *
 * @export
 * @param {string} fileSrc 原始文件地址
 * @returns {Promise<TinypngResponse>}
 */
export default function upload(fileSrc: string): Promise<TinypngResponse> {
    return <Promise<TinypngResponse>><any>rp
        .post('https://tinypng.com/web/shrink', {
            headers: {
                Host: 'tinypng.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:62.0) Gecko/20100101 Firefox/62.0'
            },
            body: fs.createReadStream(fileSrc)
        });
};
