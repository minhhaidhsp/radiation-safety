import { PartialType } from '@nestjs/mapped-types'
import { CreateFacilityDto } from './create-facility.dto'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { FacilityStatus } from '../facility.entity'

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) {
  @IsEnum(['new', 'pending', 'approved', 'rejected'] as const)
  @IsOptional()
  status?: FacilityStatus

  @IsString()
  @IsOptional()
  note?: string
}

