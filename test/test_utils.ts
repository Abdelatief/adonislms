import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
export const api = axios.create({ baseURL: BASE_URL })

type GetResponseType = <T = any, R = AxiosResponse<T>>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => Promise<R>

export const GetResponse: GetResponseType = async <T = any, R = AxiosResponse<T>>(method, url, data, config) => {
    try {
        return await api[method.toLowerCase()]<T, R>(url, data, config)
    } catch (error) {
        return error.response
    }
}
