import Database from "../database"

// 判断是否是一个对象
export const isObject = (obj: unknown) => typeof(obj) === 'object' && obj !== null

export function isKeywordInThis(key: string) {
  const instance = new Database()
  let keys = Object.keys(instance)

  return keys.includes(key)
}
