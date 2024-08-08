import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { AsbtCreateRequest } from '@interfaces';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from 'swagger';

@ApiTags('User Service')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('asbt')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: '',
  })
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
  createNewUserForAsbt(@Body() createAsbt: AsbtCreateRequest) {
    return this.usersService.createNewUserForAsbt(createAsbt);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('validate')
  validate(@Param('login') login: string) {
    return this.usersService.validate({ login });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
