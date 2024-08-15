import { ErrorCodes } from '@enums';
import { CreateFacilityRequest, UpdateFacilityRequest } from '@interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityEntity, RegionEntity } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilityEntity)
    private readonly facilityRepository: Repository<FacilityEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findAll() {
    const facilities = await this.facilityRepository.find({
      where: {
        deletedAt: null,
      },
    });

    return facilities;
  }

  async findOne(id: string) {
    const facility = await this.facilityRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!facility.id) {
      throw new NotFoundException('Facility not found');
    }

    return facility;
  }

  async create(data: CreateFacilityRequest): Promise<void> {
    const regionsIsExist = await this.regionRepository.findOne({
      where: { id: data.facilityName, deletedAt: null },
    });

    if (!regionsIsExist) {
      throw new NotFoundException(ErrorCodes.RECORD_NOT_FOUND);
    }

    await this.facilityRepository.save(data);
  }

  async update(
    id: string,
    updateFacilityDto: Omit<UpdateFacilityRequest, 'id'>,
  ): Promise<void> {
    await this.facilityRepository.update(id, {
      ...updateFacilityDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await this.facilityRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
