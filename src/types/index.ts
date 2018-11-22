/**
 * tinypng 的返回值
 */
export type TinypngResponse = {
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
    },
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
    }
};
