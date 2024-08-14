import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { createRegionDto } from './dto/create.region.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  CreateRegionRequestSwagger,
  CreateRegionResponseSwagger,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from 'swagger';

@Controller({
  path: 'regions',
  version: '1',
})
@ApiTags('Regions Service')
@Controller({
  path: 'regions',
  version: '1',
})
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateRegionRequestSwagger,
  })
  @ApiResponse({
    type: CreateRegionResponseSwagger,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: UnauthorizedResponse,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    type: ForbiddenResponse,
    status: HttpStatus.FORBIDDEN,
  })
  @ApiResponse({
    type: UnprocessableEntityResponse,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorResponse,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
