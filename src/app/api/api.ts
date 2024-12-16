import getUserToken from "app/auth/auth";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { logoutUser } from "./auth";
import { PutErrorFunction } from "app/hooks/useGlobalErrors";
import { isRequestOk } from "utils/url";

import {Api} from "./generated/ApiImpl"

const api = new Api();

const axios_instance = api.instance;

const NOT_AUTHORIZED = 401;
const FORBIDDEN = 403;

export type TPagedResponse<T> = {
  response: {
    items: T[];
    totalPages: number;
  };
};

export type TServerErrorPayload = {
  /** Message to display in user interface */
  description: string;
};
export const REDIRECT_TO_PARAM_NAME = "to";

export function setupInterceptors(
  navigateTo: NavigateFunction,
  putError: PutErrorFunction
) {
  const interceptorId = axios_instance.interceptors.response.use(null, (_error) => {
    const error = _error as AxiosError;
    if (!error.isAxiosError || !error.response) {
      return;
    }

    if (error.response.status !== NOT_AUTHORIZED) {
      if (error.response.status === FORBIDDEN) {
        navigateTo("/forbidden");
      }
      if (isServerError(error)) {
        putError(error.response.data);
      }
      return Promise.reject(error);
    }

    const to = encodeURI(window.location.pathname + window.location.search);
    const params = new URLSearchParams();
    if (getUserToken()) {
      logoutUser(navigateTo)();
      return;
    }
    params.set(REDIRECT_TO_PARAM_NAME, to);

    navigateTo("/login?" + params.toString());
  });

  return () => axios_instance.interceptors.response.eject(interceptorId);
}

axios_instance.interceptors.request.use((request) => {
  const token = getUserToken();
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default api.api;

export function isServerError(
  error: AxiosError<unknown, unknown>
): error is AxiosError<TServerErrorPayload> {
  if (!error.response?.data) {
    return false;
  }

  const payload = error.response.data;
  if (isRequestOk(error.response)) {
    return false;
  }

  if (!(payload as {[key: string]: unknown})["statusCode"]) {
    return false;
  }

  return true;
}

export type TGetListCommonParams<T extends object> = {
  sort?: keyof T;
  filters?: {
    [key in keyof T]: string;
  };
  page?: number;
};

// C - schema of create request
// U - schema of update request
// T - general schema. used for get
// export class EntityApi<T extends object, C = T, U = T> {
//   constructor(private readonly apiEndpoint: string) {}

//   async getList(
//     params: TGetListCommonParams<T>
//   ): Promise<TPagedResponse<T>["response"]> {
//     if (params.filters) {
//       params.filters = JSON.stringify(params.filters) as any;
//     }

//     const response = await axios_instance.get<TPagedResponse<T>>(this.apiEndpoint, {
//       params,
//     });
//     return response.data.response;
//   }

//   async getById(id: string) {
//     const response = await axios_instance.get(`${this.apiEndpoint}/${id}`);
//     return response.data as T;
//   }

//   async update(id: string, entity: U) {
//     return await axios_instance.put(this.apiEndpoint, {...entity, id});
//   }

//   async create(entity: C) {
//     return (await axios_instance.post(this.apiEndpoint, entity)).data as string;
//   }

//   async delete(id: string) {
//     return await axios_instance.delete(this.apiEndpoint + `/${id}`);
//   }
// }
