import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Facilities Service')
@Controller({
  path: 'facilities',
  version: '1',
})
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  // create(@Body() createFacilityDto: any) {
  //   return this.facilitiesService.create(createFacilityDto);
  // }
  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFacilityDto: any) {
  //   return this.facilitiesService.update(+id, updateFacilityDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(+id);
  }
}
