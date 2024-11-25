// 添加时间格式化函数
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export type Key = string | number

/**
 * 创建一个缓存函数，缓存函数的返回值，
 * 注意不要在 fn 中使用 computed 和 watch，用了也会失效
 * 当 key 是第一次遇到的字符串时，缓存 fn(key) 的返回值
 * 当 key 是之前遇到过的字符串时，直接返回缓存的值，
 * @param fn
 * @returns
 */
export const createCachedFn = <T extends object>(fn: (key: Key) => T) => {
  const cache = new Map<Key, T>()
  const getFromCache = (f2: typeof fn, key: Key) => {
    if (cache.has(key)) {
      return cache.get(key)!
    } else {
      const r = f2(key)
      cache.set(key, r)
      return r
    }
  }
  return (key: Key = '__default__') => getFromCache(fn, key)
}

export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr))
