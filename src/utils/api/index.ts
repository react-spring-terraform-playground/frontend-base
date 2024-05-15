import axios, { AxiosRequestConfig } from "axios";
import { ApiError } from "./api-error";

export const postApi = async <T>(options: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await axios<T>(options);
    return data;
  } catch (e) {
    console.log(e);
    throw new ApiError("System Error", e);
  }
};
