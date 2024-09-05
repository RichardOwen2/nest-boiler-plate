import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: { email: string; name: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      }
    });
  }

  async isEmailTaken(email: string) {
    const exist = await this.prisma.user.count({
      where: { email }
    }) > 0;

    return exist;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
