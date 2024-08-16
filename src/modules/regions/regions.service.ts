import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from 'entities';
import {
  CreateRegionRequest,
  FindRegionResponse,
  UpdateRegionRequest,
} from '@interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findAll(): Promise<FindRegionResponse[]> {
    const result: FindRegionResponse[] = [];

    const regions = await this.regionRepository.find({
      where: { deletedAt: null },
      relations: {
        districts: {
          facility: { user: true },
        },
      },
    });

    for (const region of regions) {
      result.push({
        id: region.id,
        regionName: region.regionName,
        districts: region.districts.map((district) => ({
          id: district.id,
          districtName: district.districtName,
          facility: {
            id: district.facility.id,
            facilityName: district.facility.facilityName,
            user: {
              id: district.facility.user.id,
              status: district.facility.user.status,
              pinpp: district.facility.user.pinpp,
              serialNumber: district.facility.user.serialNumber,
              roles: district.facility.user.accessRoles,
              login: district.facility.user.login,
              password: district.facility.user.password,
              dateFrom: district.facility.user.createdAt,
              dateTill: district.facility.user.dateTill,
            },
          },
        })),
      });
    }

    return result;
  }

  async findOne(id: string) {
    const region = await this.regionRepository.findOne({
      where: {
        id: id,
      },
      relations: { districts: true },
    });

    if (!region.id) {
      return new NotFoundException('Region not found');
    }

    return region;
  }

  async create(dto: CreateRegionRequest): Promise<RegionEntity> {
    const newRegion = this.regionRepository.create(dto);
    return await this.regionRepository.save(newRegion);
  }

  async update(
    id: string,
    dto: Omit<UpdateRegionRequest, 'id'>,
  ): Promise<void> {
    console.log(id);

    await this.regionRepository.update(id, {
      ...dto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await this.regionRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
