import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDTO, UpdateFacilityDTO } from './dto/index';

@Controller({
  path: 'facilities',
  version: '1',
})
@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDTO): Promise<void> {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDTO,
  ) {
    return this.facilitiesService.update(id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(id);
  }
}
