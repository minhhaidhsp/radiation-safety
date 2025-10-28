import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common'
import { FormsService } from './forms.service'
import { CreateFormDto } from './dto/create-form.dto'
import { UpdateFormDto } from './dto/update-form.dto'

@Controller('forms')
export class FormsController {
  constructor(private readonly service: FormsService) {}

  @Post()
  create(@Body() dto: CreateFormDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query('q') q?: string, @Query('category') category?: string, @Query('status') status?: string) {
    return this.service.findAll({ q, category, status })
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
