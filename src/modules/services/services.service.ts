import { Injectable, Query } from '@nestjs/common';
import {
  CreateServiceRequest,
  FindServiceRsponse,
  UpdateServiceRequest,
} from '@interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) { }

  async getPersonalData() { }

  async create(data: Omit<CreateServiceRequest, 'userId'>): Promise<void> {
    await this.serviceRepository.save(data);
  }

  async findAll(pagination: any): Promise<FindServiceRsponse[]> {
    const { page = 1, limit = 10 } = pagination
    const data = await this.serviceRepository.find(
      {
        take: (page - 1) * limit,
        skip: limit
      }
    );

    return data.map((item) => ({
      id: item.id,
      serviceName: item.serviceName,
      userId: item.user.id,
    }));
  }

  async findOne(id: string): Promise<FindServiceRsponse> {
    return this.serviceRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    data: Omit<UpdateServiceRequest, 'id'>,
  ): Promise<void> {
    await this.serviceRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.serviceRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
