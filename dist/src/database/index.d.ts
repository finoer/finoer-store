interface DataType {
    [props: string]: any;
}
/**
 * Provide data warehouse for fino framework
 * @param { type }  - this is a backup
 */
declare class Database {
    namespace: string;
    data: DataType;
    existingProxy: Array<string>;
    /**
     * Initialize the namespace of the currently activated project
     * @param { string } - name namespace
     */
    init(spacename: string): void;
    /**
     * set up reactive data
     * @param { object } - data 用户需要设置的数据
     * @param { string? } - namespace 命名空间
     */
    set(data: DataType, namespace?: string): void;
    /**
     * Get the data of a module
     * @param { string } - key 需要获取的数据的key值
     * @param { string } - namespace 命名空间
     */
    get(key?: string, namespace?: string): any;
    /**
     * Reset the data under the current namespace
     */
    clear(): void;
    /**
     * Proxy access chain
     * @param { object } - data 用户需要设置的数据
     * @param { string } - namespace 命名空间
     * @param { string } - key 数据的key
     */
    proxyOfprototype(data: DataType, namespace: string, key: string): void;
    /**
     * Proxy data content
     * @param { string } - namespace 命名空间
     */
    proxyOfcontent(namespace: string): ProxyConstructor;
    /**
     * set data into cache - 将数据设置到缓存中， 一个是global的命名空间，一个是当前的命名空间
     * @param { string } - namespace 命名空间
     */
    synchronizeDataInCache(namespace: string): void;
    setProxy(data: unknown): ProxyConstructor;
}
export default Database;
