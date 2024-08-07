import { Injectable } from '@nestjs/common';
import { ApplicationEntity, ServiceEntity } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { SendApplicationRequest } from '@interfaces';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async create(data: any) {
    return data;
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: string) {
    return `This action returns a #${id} application`;
  }

  // update(id: string, data: UpdateApplicationDto) {
  //   return `This action updates a #${id} application`;
  // }

  remove(id: string) {
    return `This action removes a #${id} application`;
  }
}
