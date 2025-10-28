import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common'
import { SubmissionsService } from './submissions.service'
import { CreateSubmissionDto } from './dto/create-submission.dto'
import { UpdateSubmissionDto } from './dto/update-submission.dto'

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  @Post()
  create(@Body() dto: CreateSubmissionDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query('templateId') templateId?: string, @Query('status') status?: string) {
    return this.service.findAll({ templateId: templateId ? parseInt(templateId, 10) : undefined, status })
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSubmissionDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
