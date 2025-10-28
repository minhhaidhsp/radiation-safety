import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common'
import { FacilityService } from './facility.service'
import { CreateFacilityDto } from './dto/create-facility.dto'
import { UpdateFacilityDto } from './dto/update-facility.dto'

@Controller('facility')
export class FacilityController {
  constructor(private readonly service: FacilityService) {}

  @Post()
  create(@Body() dto: CreateFacilityDto) {
    return this.service.create(dto)
  }

  @Get()
  list(@Query('status') status?: string) {
    return this.service.findAll(status)
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFacilityDto) {
    return this.service.update(id, dto)
  }

  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.service.approve(id)
  }
}

