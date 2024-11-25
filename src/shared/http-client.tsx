import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type CreateAxiosDefaults, type RawAxiosRequestHeaders } from 'axios'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Transform = (data: any) => any
declare module 'axios' {
  interface AxiosRequestConfig {
    transform?: Record<string, [Transform | null, Transform | null]>
  }
}
/**
 * @example
 * ```ts
 * const httpClient1 = new HttpClient({
 *   baseUrl: 'http://localhost:3000/api',
 *   headers: () => {
 *     return {
 *       'Authorization': 'Bearer ' + localStorage.getItem('token'),
 *       'Content-Type': 'application/json',
 *       'X-Requested-With': 'XMLHttpRequest'
 *     }
 *   },
 *   requestInterceptors: [
 *   ],
 *   responseInterceptors: [
 *     [f1, f2],
 *     [f3, f4],
 *   ],
 * })
 * ```
 */

interface HttpClientOptions extends Omit<CreateAxiosDefaults, 'headers'> {
  headers: RawAxiosRequestHeaders | (() => RawAxiosRequestHeaders)
  isErrorResponse: (response: AxiosResponse) => boolean
}

export class HttpClient {
  instance: AxiosInstance
  constructor(public options: HttpClientOptions) {
    const { headers, ...rest } = options
    this.instance = axios.create(rest)
    this.instance.interceptors.request.use(config => {
      const finalHeaders = headers instanceof Function ? headers() : headers

      Object.entries(finalHeaders).forEach(([key, value]) => {
        if (!config.headers.has(key)) {
          config.headers.set(key, value)
        }
      })
      return config
    })

    this.instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error instanceof Error) {
          return Promise.reject(error)
        }
        return Promise.reject(new Error('An unknown error occurred'))
      },
    )
  }

  request<R extends object = object>(config: AxiosRequestConfig) {
    return this.instance.request<R>(config).then(
      response => {
        if (this.options.isErrorResponse?.(response) === true) {
          throw new AxiosError('http error', 'ERR_CUSTOM', response.config, response.request, response)
        }
        return response.data
      }, error => {
        if (error instanceof AxiosError && error.response) {
          if (this.options.isErrorResponse?.(error.response) === false) return error.response.data as R
        }
        throw error
      },
    )
  }

  get<R extends object>(url: string, query?: Record<string, JSONValue>, config?: AxiosRequestConfig) {
    return this.request<R>({ ...config, url: url, params: query, method: 'get' })
  }

  post<R extends object>(url: string, data?: Record<string, JSONValue>, config?: AxiosRequestConfig) {
    return this.request<R>({ ...config, url, data, method: 'post' })
  }

  patch<R extends object>(url: string, data?: Record<string, JSONValue>, config?: AxiosRequestConfig) {
    return this.request<R>({ ...config, url, data, method: 'patch' })
  }

  delete<R extends object>(url: string, query?: Record<string, string>, config?: AxiosRequestConfig) {
    return this.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_ENDPOINT,

  headers: () => {
    return {
      contentType: 'application/json',
      token: localStorage.getItem('token'),
    }
  },
  isErrorResponse: response => {
    return response.status >= 400
  },
})

