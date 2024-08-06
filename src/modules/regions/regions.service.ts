import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionsService {
  create(createRegionDto: any) {
    return 'This action adds a new region';
  }

  findAll() {
    return `This action returns all regions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, updateRegionDto: any) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
