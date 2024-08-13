import { AsbtCreateRequest, AsbtCreateResponse } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { asbtRepsone, formatDate, roleConvert, statusConvert } from 'helpers';

@Injectable()
export class AsbtService {
  readonly #_axios: AxiosInstance;
  readonly token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiIiwiVXNlcklkIjoiMTAwMTAzOCIsIlN1YnN5c3RlbSI6IjEiLCJMT0NBTCBBVVRIT1JJVFkiOiJBc2J0QXV0aDIuMFNlcnZlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjQwMDAxMDAiLCJuYmYiOjE3MjM0NDQ2MjIsImV4cCI6MTcyMzUzMTAyMiwiaXNzIjoiQXNidEF1dGgyLjBTZXJ2ZXIiLCJhdWQiOiJodHRwOi8vYXNidC51ei8ifQ.EtRyXDZqWMwojPynCiUoCJ_O1tzTkGIfLVslWusHApY';

  constructor(config: ConfigService) {
    this.#_axios = axios.create({
      baseURL: config.getOrThrow<string>('asbt.url'),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      timeout: config.getOrThrow<number>('asbt.timeout'),
      validateStatus: (status: number): boolean => status > 199 && status < 300,
    });
  }

  async create(payload: AsbtCreateRequest): Promise<AsbtCreateResponse> {
    const result: AsbtCreateResponse = {
      AnswereId: 0,
      AnswereMessage: '',
      AnswereComment: '',
    };

    console.log({
      guid: payload.guid,
      status: statusConvert(payload.status),
      pinpp: payload.pinpp,
      doctype: payload.doctype,
      serialnumber: payload.serialnumber,
      accessRoles: payload.accessRoles.map((role) => roleConvert(role)),
      login: payload.login,
      password: payload.password,
      dateFrom: formatDate(payload.dateFrom, 'dd-MM-yyyy'),
      dateTill: formatDate(payload.dateTill, 'dd-MM-yyyy'),
    });

    console.log(process.env.ASBT_SERVICE_URL + '/UserManagement/AddUser');

    const response = await this.#_axios.request<
      AsbtCreateRequest,
      AxiosResponse<AsbtCreateResponse>
    >({
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
        dateFrom: formatDate(payload.dateFrom, 'dd-MM-yyyy'),
        dateTill: formatDate(payload.dateTill, 'dd-MM-yyyy'),
      },
    });
    console.log(response);
    return asbtRepsone(result);
  }
}
