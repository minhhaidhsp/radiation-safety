import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Facility } from './facility.entity'
import { FacilityAuditLog } from './facility-audit-log.entity'
import { FacilityService } from './facility.service'
import { FacilityController } from './facility.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Facility, FacilityAuditLog])],
  controllers: [FacilityController],
  providers: [FacilityService]
})
export class FacilityModule {}

