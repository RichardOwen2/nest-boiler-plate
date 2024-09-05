import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid Credentials', 401);
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      throw new HttpException('Invalid Credentials', 401);
    }

    return user;
  }

  async login(user: {
    id: string;
    email: string;
  }) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(name: string, email: string, password: string) {
    const isTaken = await this.usersService.isEmailTaken(email);

    if (isTaken) {
      throw new HttpException('Email is already taken', 400);
    }

    return await this.usersService.create({ name, email, password });
  }
}
