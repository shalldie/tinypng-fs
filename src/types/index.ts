/**
 * tinypng 的返回值
 */
export class TinypngResponse {
    /**
     * 上传的图片
     */
    input: {
        /**
         * 图片大小
         */
        size: number;
        /**
         * 图片类型
         * @example image/jpeg
         */
        type: string;
    };

    /**
     * 图片压缩后
     */
    output: {
        /**
         * 图片大小
         */
        size: number;
        /**
         * 图片类型
         * @example image/jpeg
         */
        type: string;
        /**
         * 图片宽度
         */
        width: number;
        /**
         * 图片高度
         */
        height: number;
        /**
         * 压缩后/压缩前 比例
         * @example 0.2139
         */
        ratio: number;
        /**
         * 压缩后图片地址
         */
        url: string;
    };
};

export class TinypngDirResult extends TinypngResponse {

    /**
     * 图片源地址
     *
     * @type {string}
     * @memberof TinypngDirResult
     */
    imgSrc: string = '';


    /**
     * 图片目标地址
     *
     * @type {string}
     * @memberof TinypngDirResult
     */
    imgTo: string = '';
};

/**
 * parallelLimit 的返回类型
 */
export type ParallelResult = {
    /**
     * 成功的列表
     */
    success: any[];
    /**
     * 失败的列表
     */
    fail: any[];
};
