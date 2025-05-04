import axios from "axios";
import type { ResponseType } from "axios";
import { replaceNullsWithUndefined } from "@/utils/helpers";

export interface Instance {
  baseURL: string;
  headers: any;
  responseType?: ResponseType;
}

function appClientInstance({ baseURL, headers, responseType }: Instance) {
  const api = axios.create({
    baseURL: baseURL,
    responseType: responseType,
  });

  api.interceptors.request.use(
    (config) => {
      //config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

      if (headers.contentType) {
        config.headers["Content-Type"] = headers.contentType;
      }

      if (headers.accept) {
        config.headers["accept"] = headers.accept;
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      if (response.data) {
        replaceNullsWithUndefined(response.data);
      }

      return response;
    },

    (error) => {
      if (error.response?.status === 401) {
        const url = new URL("/", window.location.origin);
        window.location.href = url.toString();
      }

      return Promise.reject(error);
    },
  );

  return api;
}

export const fileClient = appClientInstance({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "arraybuffer",
  headers: {
    contentType: "application/pdf",
    accept: "application/json",
  },
});

export const appClient = appClientInstance({
  baseURL: "http://localhost:4000",
  headers: {
    contentType: "application/json",
  },
});
