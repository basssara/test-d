import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Regions Service')
@Controller({
  path: 'regions',
  version: '1',
})
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  // create(@Body() createRegionDto: any) {
  //   return this.regionsService.create(createRegionDto);
  // }
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRegionDto: any) {
  //   return this.regionsService.update(+id, updateRegionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
