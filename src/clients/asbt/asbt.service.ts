import { AsbtCreateRequest, AsbtCreateResponse } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AsbtService {
  readonly #_axios: AxiosInstance;

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
  }

  async create(payload: AsbtCreateRequest): Promise<AsbtCreateResponse> {
    const data = await this.#_axios.request<
      AsbtCreateRequest,
      AsbtCreateResponse
    >({
      url: '/auth/sign-in',
      method: 'POST',
      data: {
        id: payload.id,
        status: payload.status,
        pinpp: payload.pinpp,
        doctype: payload.doctype,
        serialNumber: payload.serialNumber,
        accesRoles: payload.accesRoles,
        login: payload.login,
        password: payload.password,
        dateFrom: payload.dateFrom,
        dateTill: payload.dateTill,
      },
    });

    return {
      AnswereId: data.AnswereId,
      AnswereMessage: data.AnswereMessage,
      AnswereComment: data.AnswereComment,
    };
  }
}
