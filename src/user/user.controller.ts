import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user';
import { UpdatePatchUserDto } from './dto/update-patch-user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: [], id };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      body,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      body,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
