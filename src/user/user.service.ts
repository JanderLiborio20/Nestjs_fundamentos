import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user';
import { UpdatePatchUserDto } from './dto/update-patch-user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateUserDto) {
    const { email, name, password } = createDto;

    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateDto: UpdatePutUserDto) {
    return this.prisma.user.update({
      data: {
        name: updateDto.name,
        email: updateDto.email,
        password: updateDto.password,
        birthAt: updateDto.birthAt ? new Date(updateDto.birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDto,
  ) {
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
