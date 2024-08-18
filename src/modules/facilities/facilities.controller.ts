import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDTO, UpdateFacilityDTO } from './dto/index';

import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
  CreateRegionResponseSwagger,
  CreateFacilityRequestSwagger,
} from 'swagger';
import { GetAllFacilityResponseSwagger } from 'swagger/facilities/getall-facility';
import { GetOneFacilityResponseSwagger } from 'swagger/facilities/getone-facility';


@ApiTags('Facilities Service')



@ApiTags('Facilities Service')
@Controller({
  path: 'facilities',
  version: '1',
})
@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiResponse({
    type: [GetAllFacilityResponseSwagger],
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
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.facilitiesService.findAll({ page, limit });

  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiResponse({
    type: GetOneFacilityResponseSwagger,
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
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiBody({
    type: CreateFacilityRequestSwagger
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
