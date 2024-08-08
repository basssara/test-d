import { AsbtCreateRequest, AsbtCreateResponse } from '@interfaces';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { roleConvert, StatusConvert } from 'helpers';

export interface MessageResponse {
  AnswereId: number;
  AnswereMessage: string;
  AnswereComment: string;
}

@Injectable()
export class AsbtService {
  readonly #_axios: AxiosInstance;
  readonly token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiIiwiVXNlcklkIjoiMTAwMTAzOCIsIlN1YnN5c3RlbSI6IjEiLCJMT0NBTCBBVVRIT1JJVFkiOiJBc2J0QXV0aDIuMFNlcnZlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjQwMDAxMDAiLCJuYmYiOjE3MjMwMjY0NTcsImV4cCI6MTcyMzExMjg1NywiaXNzIjoiQXNidEF1dGgyLjBTZXJ2ZXIiLCJhdWQiOiJodHRwOi8vYXNidC51ei8ifQ.sHavzWiaVOZLuqXc50U-S41wYfHtW_K3LoTgsJh8Cdc`;

  constructor(config: ConfigService) {
    this.#_axios = axios.create({
      baseURL: 'http://195.158.30.220:20450',
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
    const result = {
      AnswereId: 0,
      AnswereMessage: '',
      AnswereComment: '',
    };

    await this.#_axios
      .request<AsbtCreateRequest, AsbtCreateResponse>({
        url: '/UserManagement/AddUser',
        method: 'POST',
        data: {
          id: payload.id,
          status: StatusConvert(payload.status),
          pinpp: payload.pinpp,
          doctype: payload.doctype,
          serialNumber: payload.serialNumber,
          accesRoles: payload.accesRoles.map((role) => roleConvert(role)),
          login: payload.login,
          password: payload.password,
          dateFrom: payload.dateFrom,
          dateTill: payload.dateTill,
        },
      })
      .then((res: AsbtCreateResponse) => {
        result.AnswereComment = res.AnswereComment;
        result.AnswereId = res.AnswereId;
        result.AnswereMessage = res.AnswereMessage;
      })
      .catch((err: AxiosError) => {
        throw new HttpException(err.message, err.status);
      });

    switch (result.AnswereId) {
      case 1:
        return;
      case 0:
        throw new InternalServerErrorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          result.AnswereMessage,
        );
      case 2:
        throw new BadRequestException(
          HttpStatus.BAD_REQUEST,
          result.AnswereMessage,
        );
      case 5:
        throw new NotFoundException(
          HttpStatus.NOT_FOUND,
          result.AnswereMessage,
        );
      case 7:
        throw new ConflictException(HttpStatus.CONFLICT, result.AnswereMessage);
      default:
        throw new InternalServerErrorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          result.AnswereMessage,
        );
    }
  }
}
