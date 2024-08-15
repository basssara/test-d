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

  async findAll(): Promise<FindDistrictResponse[]> {
    const result: FindDistrictResponse[] = [];

    const districts = await this.DistrictRepository.find(
      {
        relations: {
          facility: { user: true },
        },
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

  async findOne(id: string) {
    const district = await this.DistrictRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!district || !district.id) {
      throw new NotFoundException('District not found!');
    }
    return district;
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
