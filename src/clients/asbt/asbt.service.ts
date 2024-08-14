import { AsbtAnswers, ErrorCodes } from '@enums';
import { AsbtCreateRequest, AsbtCreateResponse } from '@interfaces';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { formatDate, roleConvert, statusConvert } from 'helpers';

@Injectable()
export class AsbtService {
  readonly #_axios: AxiosInstance;
  readonly token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiIiwiVXNlcklkIjoiMTAwMTAzOCIsIlN1YnN5c3RlbSI6IjEiLCJMT0NBTCBBVVRIT1JJVFkiOiJBc2J0QXV0aDIuMFNlcnZlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjQwMDAxMDAiLCJuYmYiOjE3MjM1NTA3MTAsImV4cCI6MTcyMzYzNzExMCwiaXNzIjoiQXNidEF1dGgyLjBTZXJ2ZXIiLCJhdWQiOiJodHRwOi8vYXNidC51ei8ifQ.QHhjX3jzmacCceIoOF4HdwWx50zdULPQ2R5J2cOFYm4';

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

  async create(
    payload: Omit<AsbtCreateRequest, 'facilityId'>,
  ): Promise<AsbtCreateResponse> {

    let oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);


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
          dateTill: oneYearFromNow,
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
}
