import { AsbtAnswers, ErrorCodes, HttpStatus } from '@enums';
import {
  AsbtCreateRequest,
  AsbtCreateResponse,
  GetPersonalDocumentRequest,
  GetPersonalDocumentResponse,
  GetPersonalDataResponse,
  GetPersonalDataWithPassportRequest,
  GetPhotoRequest,
  GetPhotoResponse,
} from '@interfaces';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AsbtConfig } from 'config';
import { formatDate, roleConvert, statusConvert } from 'helpers';

@Injectable()
export class AsbtService implements OnModuleInit {
  #_token: string;

  readonly #_axios: AxiosInstance;
  readonly #_config: Omit<AsbtConfig, 'url' | 'timeout,'>;

  constructor(config: ConfigService) {
    this.#_axios = axios.create({
      baseURL: config.getOrThrow<string>('asbt.url'),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: config.getOrThrow<number>('asbt.timeout'),
      validateStatus: (status: number): boolean => status > 199 && status < 300,
    });

    this.#_config = {
      login: config.getOrThrow<string>('asbt.login'),
      password: config.getOrThrow<string>('asbt.password'),
      currentSystem: config.getOrThrow<number>('asbt.currentSystem'),
    };

    this.#_axios.interceptors.request.use(
      this.#_requestFulfilled.bind(this),
      this.#_requestRejected.bind(this),
    );
    this.#_axios.interceptors.response.use(
      this.#_responseFulfilled.bind(this),
      this.#_responseRejected.bind(this),
    );
  }

  /**
   * @Create users
   */

  async create(
    payload: Omit<AsbtCreateRequest, 'facilityId'>,
  ): Promise<AsbtCreateResponse> {
    const response = await this.#_axios
      .request<AsbtCreateRequest, AxiosResponse<AsbtCreateResponse>>({
        url: '/UserManagement/AddUser',
        method: 'POST',
        data: {
          guid: payload.guid,
          status: statusConvert(payload.status),
          pinpp: payload.pinpp,
          doctype: payload.doctype,
          serialnumber: payload.serialnumber,
          accessRoles: payload.accessRoles.map((role) => roleConvert(role)),
          login: payload.login,
          password: payload.password,
          dateFrom: formatDate(new Date(), 'yyyy-MM-dd'),
          dateTill: formatDate(payload.dateTill, 'yyyy-MM-dd'),
        },
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data);
        throw new HttpException(err.response.data, err.response.status);
      });

    if (response.data.AnswereId !== AsbtAnswers.OK) {
      console.log(response.data);
      throw new InternalServerErrorException(ErrorCodes.INTERNAL_SERVER_ERROR);
    }

    return response.data;
  }

  /**
   * @GET data from asbt
   */

  async getPersonalData(
    payload: GetPersonalDataWithPassportRequest,
  ): Promise<GetPersonalDataResponse> {
    const response = await this.#_axios.request<
      GetPersonalDataWithPassportRequest,
      AxiosResponse<GetPersonalDataResponse>
    >({
      url: 'Prefill/GetPersonFull',
      method: 'GET',
      params: {
        Doctype: payload.doctype,
        SerialNumber: payload.serialNumber,
        pinpp: payload.pinpp,
        DateBirth: payload.dateBirth,
        Address: payload.address,
        Parrents: payload.parrents,
      },
    });
    return response.data;
  }

  // async getPersonalDataWithPinfl(
  //   payload: GetPersonalDataWithPinflRequest,
  // ): Promise<GetPersonalDataResponse> {
  //   const response = await this.#_axios.request<
  //     GetPersonalDataWithPinflRequest,
  //     AxiosResponse<GetPersonalDataResponse>
  //   >({
  //     url: '/GetPersonFull',
  //     method: 'GET',
  //     params: {
  //       Pinpp: payload.pinpp,
  //       Address: payload.address,
  //       Parrents: payload.parrents,
  //     },
  //   });

  //   return response.data;
  // }

  async getPersonalPhoto(payload: GetPhotoRequest): Promise<GetPhotoResponse> {
    const response = await this.#_axios.request<
      GetPhotoRequest,
      AxiosResponse<GetPhotoResponse>
    >({
      url: 'Prefill/GetPersonPhoto',
      method: 'GET',
      params: {
        Guid: payload.id,
      },
    });

    return response.data;
  }

  async getPersonalDocument(
    payload: GetPersonalDocumentRequest,
  ): Promise<GetPersonalDocumentResponse> {
    const response = await this.#_axios.request<
      GetPersonalDocumentRequest,
      AxiosResponse<GetPersonalDocumentResponse>
    >({
      url: 'Prefill/GetPersonDocuments',
      method: 'GET',
      params: {
        Guid: payload.id,
      },
    });

    return response.data;
  }

  async onModuleInit(): Promise<void> {
    await this.#_auth();
  }

  /**
   * @Private methods
   */

  async #_auth(): Promise<void> {
    const { data } = await this.#_axios.request({
      url: '/DUK_AUTH/agency/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        login: this.#_config.login,
        password: this.#_config.password,
        currentSystem: this.#_config.currentSystem,
      },
    });

    if (!data.access_token) {
      throw new InternalServerErrorException('Failed to get access token.');
    }

    this.#_token = data.access_token;
  }

  #_requestFulfilled(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    if (this.#_token) {
      config.headers.set('Authorization', `Bearer ${this.#_token}`);
    }

    return config;
  }

  #_requestRejected(error: unknown): Promise<never> {
    return Promise.reject(error);
  }

  #_responseFulfilled(response: AxiosResponse): AxiosResponse {
    if (response.data.error) {
      throw new BadRequestException(response.data.error.message);
    }

    return response;
  }

  async #_responseRejected(error: unknown): Promise<AxiosResponse> {
    console.log('aloqa error:', error);

    if (axios.isCancel(error)) {
      throw new RequestTimeoutException(error.message);
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (error.config?.headers.has('Retry') !== true) {
          await this.#_auth();

          error.config.headers.set('Retry', true);

          return this.#_axios.request(error.config);
        }

        throw error.response.status === HttpStatus.UNAUTHORIZED
          ? new UnauthorizedException(error.response.data)
          : new ForbiddenException(error.response.data);
      }

      console.log('Error:', {
        status: error.response.status,
        message: error.response.statusText,
        details: error.response.data,
        exception: error.name,
      });

      throw new HttpException(error.response.data, error.response.status, {
        cause: {
          status: error.response?.status ?? 500,
          message: error.response?.statusText ?? 'Internal Server Error',
          details: error.response?.data,
          exception: error.name,
        },
      });
    }

    throw new InternalServerErrorException(error);
  }
}
