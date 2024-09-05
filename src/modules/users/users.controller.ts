import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/utils/types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = await this.usersService.getProfileById(req.user.id);

    return res.status(200).json({
      code: 200,
      status: 'success',
      data: user,
    });
  }
}
