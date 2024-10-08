import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityEntity, RegionEntity, DistrictEntity } from 'entities';
import { Repository } from 'typeorm';
import { CreateDistrictRequest, FindDistrictResponse } from '@interfaces';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly DistrictRepository: Repository<DistrictEntity>,

    @InjectRepository(FacilityEntity)
    private readonly FacilityRepository: Repository<FacilityEntity>,

    @InjectRepository(RegionEntity)
    private readonly RegionRepository: Repository<RegionEntity>,
  ) { }

  async findAll(pagination: any): Promise<FindDistrictResponse[]> {
    const result: FindDistrictResponse[] = [];
    const { page = 1, limit = 10 } = pagination;


    const districts = await this.DistrictRepository.find(
      {
        relations: {
          facility: { user: true },
        },
        skip: (page - 1) * limit,
        take: limit
      }
    );

    for (const district of districts) {
      result.push({
        id: district?.id,
        districtName: district?.districtName,
        facility: {
          id: district?.facility?.id,
          facilityName: district?.facility?.facilityName,
          user: {
            id: district?.facility?.user?.id,
            status: district?.facility?.user?.status,
            pinpp: district?.facility?.user?.pinpp,
            serialNumber: district?.facility?.user?.serialNumber,
            roles: district?.facility?.user?.accessRoles,
            login: district?.facility?.user?.login,
            password: district?.facility?.user?.password,
            dateFrom: district?.facility?.user?.createdAt,
            dateTill: district?.facility?.user?.dateTill,
          },
        },
      })
    }
    return result
  }

  async findOne(id: string): Promise<FindDistrictResponse> {
    const district = await this.DistrictRepository.findOne({
      where: {
        id: id,
      },

      relations: {
        facility: { user: true },
      },
    });

    if (!district) {
      throw new NotFoundException('District not found!');
    }

    const result: FindDistrictResponse = {
      id: district?.id,
      districtName: district?.districtName,
      facility: {
        id: district?.facility?.id,
        facilityName: district?.facility?.facilityName,
        user: {
          id: district?.facility?.user?.id,
          status: district?.facility?.user?.status,
          pinpp: district?.facility?.user?.pinpp,
          serialNumber: district?.facility?.user?.serialNumber,
          roles: district?.facility?.user?.accessRoles,
          login: district?.facility?.user?.login,
          password: district?.facility?.user?.password,
          dateFrom: district?.facility?.user?.createdAt,
          dateTill: district?.facility?.user?.dateTill,
        },
      },
    }
    return result;
  }

  async create(
    createDistrictDto: Omit<CreateDistrictRequest, 'facilityId' | 'regionId'>,
  ) {
    const newDistrict = this.DistrictRepository.create(createDistrictDto);
    return await this.DistrictRepository.save(newDistrict);
  }

  async update(id: string, updateDistrictDto: any) {
    await this.DistrictRepository.update(id, {
      ...updateDistrictDto,
      updatedAt: new Date(),
    });
    return 'ok';
  }

  async remove(id: string) {
    await this.DistrictRepository.update(id, {
      deletedAt: new Date(),
    });
    return 'OK';
  }
}
