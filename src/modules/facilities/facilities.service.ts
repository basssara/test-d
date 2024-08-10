import { CreateFacilityRequest, UpdateFacilityRequest } from '@interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityEntity } from 'entities';
import { dot } from 'node:test/reporters';
import { threadId } from 'node:worker_threads';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {

  constructor(
    @InjectRepository(FacilityEntity)
    private readonly FacilityRepository: Repository<FacilityEntity>
  ) { }

  async findAll() {
    const facilities = await this.FacilityRepository.find(
      {
        where: {
          deletedAt: null
        }
      }
    )

    return facilities;
  }

  async findOne(id: string) {
    const facility = await this.FacilityRepository.findOne(
      {
        where: {
          id: id
        }
      }
    );

    if (!facility || !facility.id) {
      throw new NotFoundException("Facility not found")
    };

    return facility;
  };

  async create(createFacilityDto: CreateFacilityRequest) {
    console.log(createFacilityDto);

    const new_facility = this.FacilityRepository.create(createFacilityDto)
    return await this.FacilityRepository.save(new_facility)
  }


  async update(id: string, updateFacilityDto: Omit<UpdateFacilityRequest, 'id'>): Promise<void> {
    await this.FacilityRepository.update(id, {
      ...updateFacilityDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await this.FacilityRepository.update(id,
      {
        deletedAt: new Date(),
      }
    )
  }
}
