import { HttpException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { INote } from 'src/utils/types';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) { }

  async verifyOwnership(noteId: string, userId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new HttpException('Note not found', 404);
    }

    if (note.userId !== userId) {
      throw new HttpException('Note not found', 404);
    }
  }

  async create(userId: string, data: INote) {
    return this.prisma.note.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(id: string, data: INote) {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.note.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  async findById(noteId: string, userId: string) {
    return this.prisma.note.findUnique({
      where: { 
        id: noteId,
        userId,
      },
    });
  }
}
