import * as _ from './utils';
import { ParallelResult } from '../types';

class ParallelLimit {

    /**
     *Creates an instance of ParallelLimit.
     * @param {Array<() => Promise<any>>} tasks 异步任务列表
     * @memberof ParallelLimit
     */
    constructor(tasks: Array<() => Promise<any>>) {
        this.tasks = tasks;
        this.resolvedList = Array(this.tasks.length).fill(undefined);
        this.rejectedList = Array(this.tasks.length).fill(undefined);
    }

    /**
     * 异步任务列表
     *
     * @private
     * @memberof ParallelLimit
     */
    private tasks: Array<() => Promise<any>> = [];

    /**
     * 当前执行到的索引
     *
     * @private
     * @type {number}
     * @memberof ParallelLimit
     */
    private invokeIndex: number = 0;

    /**
     * 成功执行完毕的数据列表
     *
     * @private
     * @type {any[]}
     * @memberof ParallelLimit
     */
    private resolvedList: any[] = [];

    /**
     * 失败的数据列表
     *
     * @private
     * @type {any[]}
     * @memberof ParallelLimit
     */
    private rejectedList: any[] = [];

    private resolve: Function;

    private async invokeNext() {
        if (this.invokeIndex >= this.tasks.length) {
            this.resolve({
                success: this.resolvedList,
                fail: this.rejectedList
            });
            return;
        }
        this.invokeIndex++;
        const tempIndex = this.invokeIndex;
        const func = this.tasks[this.invokeIndex];
        const [err, result] = await _.getAsyncTuple(func());
        if (err) {
            this.rejectedList[tempIndex] = err;
        }
        else {
            this.resolvedList[tempIndex] = result;
        }
        this.invokeNext();
    }

    /**
     * 开始并发任务
     *
     * @param {number} [limit=0] 最大并发限制
     * @returns {Promise<Array<Array<any>,Array<any>>>}
     * @memberof ParallelLimit
     */
    public run(limit: number = 0): Promise<ParallelResult> {
        let promise = new Promise<ParallelResult>(resolve => {
            this.resolve = resolve;
        });
        for (let i = 0; i < (limit || this.tasks.length); i++) {
            this.invokeNext();
        }
        return promise;
    }
}

/**
 * 并发执行一系列任务
 *
 * @export
 * @param {Array<() => Promise<any>>} tasks 并发任务
 * @param {number} [limit=0] 最大并发量限制
 * @returns {Promise<ParallelResult>}
 */
export default function parallelLimit(tasks: Array<() => Promise<any>>, limit: number = 0): Promise<ParallelResult> {
    const parallel = new ParallelLimit(tasks);
    return parallel.run(limit);
}
