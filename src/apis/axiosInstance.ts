import configs from '@constants/configs';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    // eslint-disable-next-line no-param-reassign
    const token = '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    // Do something with response data
    return response;
  },
  (error: any) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

class Http {
  private _http: AxiosInstance;

  /**
   *
   * @param options AxiosRequestConfig
   */
  public constructor(options: AxiosRequestConfig) {
    // eslint-disable-next-line no-underscore-dangle
    this._http = axios.create(options);
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   *
   * @param url string
   * @param config AxiosRequestConfig
   */
  public get(url: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse> {
    return this._http.get(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public post(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this._http.post(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public put(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this._http.put(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public patch(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this._http.patch(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public delete(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this._http.delete(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public head(url: string, config?: AxiosRequestConfig | undefined) {
    return this._http.head(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public options(url: string, config?: AxiosRequestConfig | undefined) {
    return this._http.options(url, config);
  }

  /**
   *
   */
  private interceptorsRequest(): void {
    this._http.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        // Do something before request is sent
        try {
          const token = '';
          config.headers = {
            Authorization: `Bearer ${token}`,
            ...config.headers,
          };
        } catch (error) {
          console.log(error);
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
  }

  /**
   *
   */
  private interceptorsResponse(): void {
    this._http.interceptors.response.use(
      (response: any) => {
        // Do something with response data
        return response;
      },
      (error: any) => {
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }
}

export default new Http({
  timeout: 3 * 60 * 1000,
  baseURL: configs.BASE_API_URL,
  headers: {
    'username': 'testadmin',
    'password': 'test',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
  },
  withCredentials: false,
});
