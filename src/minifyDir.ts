import fs from 'fs';
import path from 'path';
import rq from 'request';
import rp from 'request-promise';
import async from 'async';
import * as _ from './lib/utils';
import { TinypngResponse } from './types';

async function minifyDir(dirSrc: string, dirTo: string, parallelNumber: number = 5) {
    // 创建目标路径
    _.mkdirp(dirTo);

    const imgs = _.getAllImages(dirSrc);

    async.parallelLimit(imgs.map(imgSrc => {
        return function (next) {

        };
    }), parallelNumber, (err) => {

    });
}
