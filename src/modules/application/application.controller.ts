import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application Service')
@Controller({
  path: 'application',
  version: '1',
})
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Post()
  create(@Body() data: '') {
    return this.service.create(data);
  }

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
