import { Injectable } from '@nestjs/common';

@Injectable()
export class FacilitiesService {
  // create(createFacilityDto: any) {
  //   return 'This action adds a new facility';
  // }

  findAll() {
    return `This action returns all facilities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  // update(id: number, updateFacilityDto: any) {
  //   return `This action updates a #${id} facility`;
  // }

  remove(id: number) {
    return `This action removes a #${id} facility`;
  }
}
