import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
export const api = axios.create({ baseURL: BASE_URL })

type GetResponseType = <T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig) => Promise<R>

export const GetResponse: GetResponseType = async <T = any, R = AxiosResponse>(config) => {
    try {
        return await api.request<T, R>(config)
    } catch (error) {
        return error.response
    }
}
