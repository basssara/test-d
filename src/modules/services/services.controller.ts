import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetPersonalDataResponse,
  GetPersonalDocumentResponse,
  GetPhotoResponse,
} from '@interfaces';
import { AsbtService } from 'clients';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from 'swagger';
import { CheckPermissionGuard } from 'guards';
import { Roles } from 'decorators';
import { Roles as Role } from '@enums';

@ApiTags('Service Service')
@Controller({
  path: 'services',
  version: '1',
})
export class ServicesController {
  constructor(
    private readonly service: ServicesService,
    private readonly asbtService: AsbtService,
  ) { }

  @Post()
  create(@Body() createServiceDto: any) {
    return this.service.create(createServiceDto);
  }

  @Get('/get-personal-data')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.GET_PERSONAL_INFO)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'doctype', required: true })
  @ApiQuery({ name: 'serialNumber', required: true })
  @ApiQuery({ name: 'dateBirth', required: true })
  @ApiQuery({ name: 'address', required: true })
  @ApiQuery({ name: 'parrents', required: true })
  @ApiResponse({
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
  getPersonalDataWithPassport(
    @Query('doctype') doctype: number,
    @Query('serialNumber') serialNumber: string,
    @Query('pinpp') pinpp: string,
    @Query('dateBirth') dateBirth: Date,
    @Query('address') address: boolean,
    @Query('parrents') parrents: boolean,
  ): Promise<GetPersonalDataResponse> {
    return this.asbtService.getPersonalData({
      doctype,
      serialNumber,
      pinpp,
      dateBirth,
      address,
      parrents,
    });
  }

  // @Get('/get-data-with-pinfl')
  // @HttpCode(HttpStatus.OK)
  // @ApiQuery({ name: 'pinpp', required: true })
  // @ApiQuery({ name: 'address', required: true })
  // @ApiQuery({ name: 'parrents', required: true })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // @ApiResponse({
  //   type: UnauthorizedResponse,
  //   status: HttpStatus.UNAUTHORIZED,
  // })
  // @ApiResponse({
  //   type: ForbiddenResponse,
  //   status: HttpStatus.FORBIDDEN,
  // })
  // @ApiResponse({
  //   type: UnprocessableEntityResponse,
  //   status: HttpStatus.UNPROCESSABLE_ENTITY,
  // })
  // @ApiResponse({
  //   type: InternalServerErrorResponse,
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  // })
  // getPersonalDataWithPinfl(
  //   @Query('pinpp') pinpp: number,
  //   @Query('address') address: boolean,
  //   @Query('parrents') parrents: boolean,
  // ): Promise<GetPersonalDataResponse> {
  //   return this.asbtService.getPersonalDataWithPinfl({
  //     pinpp,
  //     address,
  //     parrents,
  //   });
  // }

  @Get('get-photo')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.GET_PERSONAL_INFO)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({
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
  getPersonalPhoto(@Query('id') id: string): Promise<GetPhotoResponse> {
    return this.asbtService.getPersonalPhoto({ id });
  }

  @Get('get-document')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.GET_PERSONAL_INFO)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'id', required: true })
  @ApiResponse({
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
  getPersonalDocument(
    @Query('id') id: string,
  ): Promise<GetPersonalDocumentResponse> {
    return this.asbtService.getPersonalDocument({ id });
  }

  @Get()
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.GET_PERSONAL_INFO)
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    return this.service.findAll({ page, limit });
  }



  @Get(':id')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN, Role.GET_PERSONAL_INFO)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN)
  update(@Param('id') id: string, @Body() updateServiceDto: any) {
    return this.service.update(id, updateServiceDto);
  }

  @Delete(':id')
  // @UseGuards(CheckPermissionGuard)
  // @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
