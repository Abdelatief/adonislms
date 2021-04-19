import axios from "axios";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
export const api = axios.create({ baseURL: BASE_URL })
