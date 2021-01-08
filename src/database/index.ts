import { isKeywordInThis, isObject } from "../utils";

interface DataType {
  [props: string]: any
}

/**
 * Provide data warehouse for fino framework
 * @param { type }  - this is a backup
 */
class Database {
  // Namespace of module data
  public namespace: string = '';

  // Database
  public data: DataType = {};

  // Cache data key that has been set up proxy;
  private existingProxy: Array<string> = [];


  /**
   * Initialize the namespace of the currently activated project
   * @param { string } - name namespace
   */
  init(spacename: string) {
    if(!spacename) { throw new Error('请传入命名空间'); return }

    // 重置上一个命名空间的状态
    // this.reset()
    this.namespace = spacename
  }

  /**
   * set up reactive data
   * @param { object } - data 用户需要设置的数据
   * @param { string? } - namespace 命名空间
   */
  set(data: DataType, namespace?: string) {

    if(namespace && isKeywordInThis(namespace)) {
      console.error(`${namespace}是数据仓库的关键字，请更改命名空间`);
      return
    }

    if(!isObject(data)) {
      console.error(`设置的数据必须是一个对象`);
      return
    }

    const currentSpace: string = namespace || this.namespace;

    let initialData = this.data[currentSpace] || {};

    // 设置数据
    this.data[currentSpace] = Object.assign(initialData, data, {
      _spacename: currentSpace
    })

    // 代理访问链
    for(let key in data) {
      this.proxyOfprototype(data, currentSpace, key)
    }

    // 代理内容
    this.data[currentSpace] = this.proxyOfcontent(currentSpace)
  }

  /**
   * Get the data of a module
   * @param { string } - key 需要获取的数据的key值
   * @param { string } - namespace 命名空间
   */
  get(key?: string, namespace?: string) {
    // 如果key为空，返回所有数据
    if(!key && namespace) {
      return this.data[this.namespace]
    }
    // 如果不传第二个参数， 默认获取当前命名空间下面的数据
    else if(key && !namespace && this.data[this.namespace] && this.data[this.namespace][key] !== undefined) {
      return this.data[this.namespace][key]
    }
    // 如果穿了第二个参数， 那么获取相应命名空间下面的数据
    else if(namespace && key && this.data[namespace]) {
      return this.data[namespace][key]
    }
  }

  /**
   * Reset the data under the current namespace
   */
  clear() {
    if(!this.data[this.namespace]) { return }

    const keys = Object.keys(this.data[this.namespace]);

    keys.forEach(key => {
      if(key === 'spacename') { return }

      delete (this as DataType)[key]
    })

    this.data[this.namespace] = null
  }

  /**
   * Proxy access chain
   * @param { object } - data 用户需要设置的数据
   * @param { string } - namespace 命名空间
   * @param { string } - key 数据的key
   */
  proxyOfprototype(data: DataType, namespace: string, key: string) {
    if(key === '_spacename') { return }

    console.log(data)

    const _namespace = namespace || this.namespace;

    const sharePropertyDefinition = {

      get: () => {
        return this.data[_namespace][key]
      },

      set: (newvalue: unknown) => {
        this.data[key] = newvalue
        this.data[_namespace][key] = newvalue
      },

      enumerable: true,
      configurable: true,
    }

    Object.defineProperty(this, key, sharePropertyDefinition)
  }

  /**
   * Proxy data content
   * @param { string } - namespace 命名空间
   */
  proxyOfcontent(namespace: string): ProxyConstructor {
    if(this.existingProxy.includes(namespace)) {
      return this.data[namespace]
    }

    let proxy =  new Proxy(this.data[namespace], {
      get: (target: any, key: string | number | symbol, receiver: any) => {

        const res = Reflect.get(target, key, receiver);

        return res
      },
      set: (target: any, key: string | number | symbol, value: any, receiver: any) => {
        const oldValue = target[key]
        if(target._spacename !== this.namespace && target._spacename !== 'global') {
          console.error('不允许修改其他数据仓库的数据');
          return oldValue
        }
        const result = Reflect.set(target, key, value, receiver);

        return result
      }
    })

    this.existingProxy.push(namespace)

    return proxy
  }


}


export default Database
