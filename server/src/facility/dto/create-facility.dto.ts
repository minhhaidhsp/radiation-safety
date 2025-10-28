import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min
} from 'class-validator'
import { FacilityStatus } from '../facility.entity'

export class CreateFacilityDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsOptional()
  tax_code?: string

  @IsString()
  @IsNotEmpty()
  type!: string // Y tế, Công nghiệp, Nghiên cứu, Giáo dục

  @IsString()
  @IsNotEmpty()
  address!: string

  @IsString()
  @IsNotEmpty()
  legal_representative!: string

  @IsInt()
  @Min(1)
  device_count!: number

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  device_types?: string[]

  @IsString()
  @IsOptional()
  purpose?: string

  @IsString()
  @IsNotEmpty()
  radiation_officer!: string

  @IsString()
  @IsOptional()
  license_number?: string

  @IsString()
  @IsOptional()
  certificate_number?: string

  @IsDateString()
  @IsOptional()
  certificate_date?: string

  @IsObject()
  @IsOptional()
  attachments?: Record<string, string>

  @IsEnum(['new', 'pending', 'approved', 'rejected'] as const)
  @IsOptional()
  status?: FacilityStatus
}

