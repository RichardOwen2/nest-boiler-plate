import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { RequestWithUser } from 'src/utils/types';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Get()
  async findAll(@Req() req: RequestWithUser, @Res() res: Response) {
    const notes = await this.notesService.findByUserId(req.user.id);

    return res.status(200).json({
      code: 200,
      status: 'success',
      data: notes,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() body: CreateNoteDto,
    @Req() req: RequestWithUser, 
    @Res() res: Response
  ) {
    const note = await this.notesService.create(
      req.user.id,
      body
    );

    return res.status(200).json({
      code: 200,
      status: 'success',
      data: note,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Req() req: RequestWithUser, @Res() res: Response) {
    const note = await this.notesService.findById(id, req.user.id);

    if (!note) {
      throw new HttpException('Note not found', 404);
    }

    return res.status(200).json({
      code: 200,
      status: 'success',
      data: note,
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() body: EditNoteDto,
    @Req() req: RequestWithUser, 
    @Res() res: Response
  ) {
    await this.notesService.verifyOwnership(id, req.user.id);

    const note = await this.notesService.update(id, body);

    return res.status(200).json({
      code: 200,
      status: 'success',
      data: note,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: RequestWithUser, 
    @Res() res: Response
  ) {
    await this.notesService.verifyOwnership(id, req.user.id);

    await this.notesService.delete(id);

    return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Note deleted successfully',
    });
  }
}
