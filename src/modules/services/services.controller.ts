import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags } from '@nestjs/swagger';
import {
  GetPhotoRequestDto,
  GetPersonalDataWithPassportRequestDto,
  GetPersonalDataWithPinflRequestDto,
  GetPersonalDocumentRequestDto,
} from './dto';
import {
  GetPersonalDataResponse,
  GetPersonalDocumentResponse,
  GetPhotoResponse,
} from '@interfaces';
import { AsbtService } from 'clients';

@ApiTags('Service Service')
@Controller({
  path: 'services',
  version: '1',
})
export class ServicesController {
  constructor(
    private readonly service: ServicesService,
    private readonly asbtService: AsbtService,
  ) {}

  @Post()
  create(@Body() createServiceDto: any) {
    return this.service.create(createServiceDto);
  }

  @Get('/get-data-with-passport')
  getPersonalDataWithPassport(
    @Query() query: GetPersonalDataWithPassportRequestDto,
  ): Promise<GetPersonalDataResponse> {
    return this.asbtService.getPersonalDataWithPassport(query);
  }

  @Get('/get-data-with-pinfl')
  getPersonalDataWithPinfl(
    @Query() query: GetPersonalDataWithPinflRequestDto,
  ): Promise<GetPersonalDataResponse> {
    return this.asbtService.getPersonalDataWithPinfl(query);
  }

  @Get('get-photo')
  getPersonalPhoto(
    @Query() query: GetPhotoRequestDto,
  ): Promise<GetPhotoResponse> {
    return this.asbtService.getPersonalPhoto(query);
  }

  @Get('get-document')
  getPersonalDocument(
    @Query() query: GetPersonalDocumentRequestDto,
  ): Promise<GetPersonalDocumentResponse> {
    return this.asbtService.getPersonalDocument(query);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: any) {
    return this.service.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
