import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from 'entities';
import { RegionModel, CreateServiceRequest, UpdateRegionRequest, FindRegionRequest } from '@interfaces';
import { Repository } from 'typeorm';
import { createRegionDto } from "./dto/create.region.dto"


@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>
  ) { }

  async findAll() {
    const regions = this.regionRepository.find();
    return regions;
  };

  async findOne(id: string) {
    const region = this.regionRepository.findOne(
      {
        where: {
          id: id
        }
      }
    )

    if (!region) {
      throw new NotFoundException("Region not found")
    }

    return region;
  }

  async create(dto: createRegionDto): Promise<RegionEntity> {
    const new_region = this.regionRepository.create(dto)
    return this.regionRepository.save(new_region);
  }

  async update(id: string, dto: Omit<UpdateRegionRequest, 'id'>): Promise<void> {
    console.log(id);

    await this.regionRepository.update(id, {
      ...dto,
      updatedAt: new Date()
    })
  }

  async remove(id: string): Promise<void> {
    await this.regionRepository.update(id, {
      deletedAt: new Date()
    })
  }
}
