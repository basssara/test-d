import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';

import { CreateFacilityDTO, UpdateFacilityDTO } from './dto/index';


import { ApiTags } from '@nestjs/swagger';
@Controller({
  path: 'facilities',
  version: '1'
})


@ApiTags('Facilities Service')
@Controller({
  path: 'facilities',
  version: '1',
})
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) { }

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDTO) {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDTO) {
    return this.facilitiesService.update(id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(id);
  }
}
