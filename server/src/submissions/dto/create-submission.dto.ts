import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'

export class CreateSubmissionDto {
  @IsInt()
  @Min(1)
  templateId!: number

  @IsString()
  @IsNotEmpty()
  user!: string

  @IsString()
  @IsNotEmpty()
  dept!: string

  @IsString()
  @IsNotEmpty()
  status!: string

  @IsOptional()
  submittedAt?: Date
}

