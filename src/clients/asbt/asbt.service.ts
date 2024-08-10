import { AsbtCreateRequest, AsbtCreateResponse } from '@interfaces';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { asbtRepsone, formatDate, roleConvert, statusConvert } from 'helpers';

@Injectable()
export class AsbtService {
  readonly #_axios: AxiosInstance;
  readonly token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiIiwiVXNlcklkIjoiMTAwMTAzOCIsIlN1YnN5c3RlbSI6IjEiLCJMT0NBTCBBVVRIT1JJVFkiOiJBc2J0QXV0aDIuMFNlcnZlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjQwMDAxMDAiLCJuYmYiOjE3MjMxMjA0NzgsImV4cCI6MTcyMzIwNjg3OCwiaXNzIjoiQXNidEF1dGgyLjBTZXJ2ZXIiLCJhdWQiOiJodHRwOi8vYXNidC51ei8ifQ.PqWxALRy-2zvvFCFss6HFyssF5selSJJMZkrRhRBXA0';

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

    await this.#_axios
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
          dateFrom: formatDate(payload.dateFrom, 'dd-MM-yyyy'),
          dateTill: formatDate(payload.dateTill, 'dd-MM-yyyy'),
        },
      })
      .then((res: AxiosResponse<AsbtCreateResponse>) => {
        result.AnswereId = res.data.AnswereId;
        result.AnswereMessage = res.data.AnswereMessage;
        result.AnswereComment = res.data.AnswereComment;
      })
      .catch((err: AxiosError) => {
        switch (err.response.status) {
          case 401:
            throw new UnauthorizedException(err.response.statusText);
          case 400:
            throw new BadRequestException(err.response.statusText);
          default:
            throw new InternalServerErrorException(err.response.statusText);
        }
      });
    return asbtRepsone(result);
  }
}
