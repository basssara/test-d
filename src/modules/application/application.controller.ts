import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  // @Post()
  // create(@Body() data: ) {
  //   return this.service.create(data);
  // }
  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.service.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  // @Param('id') id: string,
  //   @Body() data: ,
  // ) {
  //   return this.service.update(id, data);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.service.remove(+id);
  // }
}
