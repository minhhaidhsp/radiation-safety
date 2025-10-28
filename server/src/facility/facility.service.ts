import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Facility, FacilityStatus } from './facility.entity'
import { CreateFacilityDto } from './dto/create-facility.dto'
import { UpdateFacilityDto } from './dto/update-facility.dto'
import { FacilityAuditLog } from './facility-audit-log.entity'

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility) private readonly repo: Repository<Facility>,
    @InjectRepository(FacilityAuditLog) private readonly logRepo: Repository<FacilityAuditLog>
  ) {}

  private generateFacilityCode(): string {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const tail = String(now.getTime()).slice(-3)
    return `CS_${yyyy}${mm}${dd}_${tail}`
  }

  async create(dto: CreateFacilityDto) {
    const facility_code = this.generateFacilityCode()
    const entity = this.repo.create({
      ...dto,
      facility_code,
      certificate_date: dto.certificate_date ? new Date(dto.certificate_date) : null,
      status: dto.status ?? 'pending'
    })
    const saved = await this.repo.save(entity)
    await this.log(saved.id, 'create', null, 'Khởi tạo hồ sơ cơ sở')
    return saved
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } })
  }

  async update(id: number, dto: UpdateFacilityDto) {
    const current = await this.findOne(id)
    if (!current) return null
    const next: Partial<Facility> = { ...dto }
    if (dto.certificate_date !== undefined) {
      next.certificate_date = dto.certificate_date ? new Date(dto.certificate_date) : null
    }
    await this.repo.update(id, next)
    const updated = await this.findOne(id)
    if (dto.status) {
      await this.log(id, 'update', null, dto.note ?? `Cập nhật trạng thái: ${dto.status}`)
    } else {
      await this.log(id, 'update', null, dto.note ?? 'Cập nhật hồ sơ')
    }
    return updated
  }

  async approve(id: number) {
    await this.repo.update(id, { status: 'approved' as FacilityStatus })
    const updated = await this.findOne(id)
    await this.log(id, 'approve', null, 'Phê duyệt hồ sơ')
    return updated
  }

  async findAll(status?: string) {
    if (status) {
      return await this.repo.find({ where: { status: status as FacilityStatus }, order: { updated_at: 'DESC' } })
    }
    return await this.repo.find({ order: { updated_at: 'DESC' } })
  }

  private async log(facilityId: number, action: string, performed_by?: string | null, note?: string | null) {
    const ref = await this.repo.findOne({ where: { id: facilityId } })
    if (!ref) return
    const entry = this.logRepo.create({ facility: ref, action, performed_by: performed_by ?? null, note: note ?? null })
    await this.logRepo.save(entry)
  }
}

