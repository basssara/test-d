import { ErrorCodes } from '@enums';
import { CreateFacilityRequest, FindFacilityResponse, UpdateFacilityRequest } from '@interfaces';
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
  ) { }

  async findAll(pagination: any): Promise<FindFacilityResponse[]> {
    const result: FindFacilityResponse[] = []
    const { page, limit } = pagination

    const facilities = await this.facilityRepository.find({
      relations: {
        user: true
      },
      skip: (page - 1) * limit,
      take: page
    });

    for (const facility of facilities) {
      result.push({
        id: facility?.id,
        facilityName: facility?.facilityName,
        users: {
          id: facility?.user?.id,
          status: facility?.user?.status,
          pinpp: facility?.user?.pinpp,
          serialNumber: facility?.user?.serialNumber,
          roles: facility?.user?.accessRoles,
          login: facility?.user?.login,
          password: facility?.user?.password,
          dateFrom: facility?.user?.createdAt,
          dateTill: facility?.user?.dateTill
        }
      })
    }

    return result;
  }

  async findOne(id: string): Promise<FindFacilityResponse> {
    const facility = await this.facilityRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      relations: {
        user: true
      }
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    const result: FindFacilityResponse = {
      id: facility?.id,
      facilityName: facility?.facilityName,
      users: {
        id: facility?.user?.id,
        status: facility?.user?.status,
        pinpp: facility?.user?.pinpp,
        serialNumber: facility?.user?.serialNumber,
        roles: facility?.user?.accessRoles,
        login: facility?.user?.login,
        password: facility?.user?.password,
        dateFrom: facility?.user?.createdAt,
        dateTill: facility?.user?.dateTill
      }
    };

    return result;
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
