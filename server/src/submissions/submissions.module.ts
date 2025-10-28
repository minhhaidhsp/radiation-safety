import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubmissionsController } from './submissions.controller'
import { SubmissionsService } from './submissions.service'
import { Submission } from './submission.entity'
import { FormTemplate } from '../forms/form-template.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Submission, FormTemplate])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}
