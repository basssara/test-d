import { Body, Controller, Post, Param, Get, Patch, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';
import { createApplicationDTO, updateApplicationDto } from './dto';

@ApiTags('Application Service')
@Controller({
  path: 'application',
  version: '1',
})
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Post()
  // applicationId va amuntni qo'lda berib qo'yganman to'g'irlash kerak bo'ladi
  create(@Body() data: createApplicationDTO) {
    console.log(data)
    return this.applicationService.create(
      {
        ...data,
        applicationId: 1,
        amount: 1
      }
    );
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: updateApplicationDto) {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }
}
