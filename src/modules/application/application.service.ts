import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationEntity, ServiceEntity } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiLengthRequiredResponse } from '@nestjs/swagger';
import { dataSourceOptions } from 'config';
import { SendApplicationRequest, UpdateApplicationRequest } from '@interfaces';
import { updateApplicationDto } from './dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) { }

  async create(data: any) {
    const new_application = await this.applicationRepository.create(data)
    return await this.applicationRepository.save(new_application)
  }

  async findAll() {
    const applications = await this.applicationRepository.find();
    return {
      message: "succes",
      data: applications
    }
  }

  async findOne(id: string) {
    const application = await this.applicationRepository.findOne(
      {
        where: {
          id: id,
        }
      }
    )
    if (!application || !application.id) {
      throw new NotFoundException("Application not found")
    };

    return {
      message: "succes",
      data: application
    }
  }

  async update(id: string, UpdateApplicationDto: UpdateApplicationRequest): Promise<void> {
    await this.applicationRepository.update(id,
      {
        ...UpdateApplicationDto,
        updatedAt: new Date(),
      }
    );
  }

  async remove(id: string): Promise<void> {
    await this.applicationRepository.update(id,
      {
        deletedAt: new Date(),
      }
    )
  }
}
