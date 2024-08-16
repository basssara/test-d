import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDTO, UpdateDistrictDTO } from './dto/index';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Districts Service')
@Controller({
  path: 'districts',
  version: '1',
})
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  getAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.districtService.findOne(id);
  }

  @Post()
  craete(@Body() crateDistrictDto: CreateDistrictDTO) {
    return this.districtService.create(crateDistrictDto);
  }

  @Put(':id')
  update(@Param() id: string, updateDistrictDto: UpdateDistrictDTO) {
    return this.districtService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  remove(@Param() id: string) {
    return this.districtService.remove(id);
  }
}
