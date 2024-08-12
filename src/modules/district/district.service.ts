import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityEntity, RegionEntity, DistrictsEntity } from 'entities';
import { Repository } from 'typeorm';
import { CreateDistrictRequest, UpdateDistrictRequest } from '@interfaces';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(DistrictsEntity)
        private readonly DistrictRepository: Repository<DistrictsEntity>,

        @InjectRepository(FacilityEntity)
        private readonly FacilityRepository: Repository<FacilityEntity>,

        @InjectRepository(RegionEntity)
        private readonly RegionRepository: Repository<RegionEntity>
    ) { }


    async findAll() {
        const districts = await this.DistrictRepository.find()
        return districts
    }

    async findOne(id: string) {
        const district = await this.DistrictRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        )

        if (!district || !district.id) {
            throw new NotFoundException('District not found!')
        }
        return district
    }


    async create(createDistrictDto: Omit<CreateDistrictRequest, 'facilityId' | 'regionId'>) {
        const new_district = this.DistrictRepository.create(createDistrictDto)
        return await this.DistrictRepository.save(new_district)

    }

    async update(id: string, updateDistrictDto: any) {
        await this.DistrictRepository.update(id, {
            ...updateDistrictDto,
            updatedAt: new Date(),
        });
        return 'ok'

    }

    async remove(id: string) {
        await this.DistrictRepository.update(id,
            {
                deletedAt: new Date(),
            }
        )
        return 'OK'
    }
}
