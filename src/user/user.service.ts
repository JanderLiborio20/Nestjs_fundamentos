import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
