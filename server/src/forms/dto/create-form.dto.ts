import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  category!: string

  @IsIn(['active', 'draft', 'archived'])
  @IsOptional()
  status?: 'active' | 'draft' | 'archived'
}

