import { Controller, Get, Post, Param, Delete, Body, Patch, Put } from '@nestjs/common';
import { RegionsService } from './regions.service';

import { createRegionDto } from './dto/create.region.dto';

import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'regions',
  version: '1'
})

@ApiTags('Regions Service')
@Controller({
  path: 'regions',
  version: '1',
})
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) { }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Post()
  create(@Body() dto: createRegionDto) {
    return this.regionsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: any) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
