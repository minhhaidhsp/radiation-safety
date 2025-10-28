import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormsController } from './forms.controller'
import { FormsService } from './forms.service'
import { FormTemplate } from './form-template.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FormTemplate])],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [TypeOrmModule]
})
export class FormsModule {}
