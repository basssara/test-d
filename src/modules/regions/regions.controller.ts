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
  Query,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { createRegionDto, PaginationDto } from './dto/index';
import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
  CreateRegionRequestSwagger,
  CreateRegionResponseSwagger,
  UpdateRegionRequestSwagger,
  GetAllRegionResponseSwagger,
  UpdateRegionResponseSwagger,
  GetOneRegionResponseSwagger,
  DeleteRegionResponseSwagger
} from 'swagger';
import { uuid } from 'helpers';

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
  constructor(private readonly regionsService: RegionsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiResponse({
    type: [GetAllRegionResponseSwagger],
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
  findAll(@Query() paginationDto: any) {
    console.log(paginationDto);
    return this.regionsService.findAll(paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Region id',
  })
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiResponse({
    type: GetOneRegionResponseSwagger,
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
    return this.regionsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Region id',
  })
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiBody({
    type: UpdateRegionRequestSwagger,
  })
  @ApiResponse({
    type: UpdateRegionResponseSwagger,
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
  update(@Param('id') id: string, @Body() updateRegionDto: any) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Region id',
  })
  @ApiBearerAuth('JWT')
  @ApiHeader({
    name: 'token',
    description: 'JWT token',
  })
  @ApiResponse({
    type: DeleteRegionResponseSwagger,
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
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
