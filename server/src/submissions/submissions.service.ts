import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Submission } from './submission.entity'
import { CreateSubmissionDto } from './dto/create-submission.dto'
import { UpdateSubmissionDto } from './dto/update-submission.dto'
import { FormTemplate } from '../forms/form-template.entity'

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly repo: Repository<Submission>,
    @InjectRepository(FormTemplate)
    private readonly forms: Repository<FormTemplate>
  ) {}

  async create(dto: CreateSubmissionDto) {
    const template = await this.forms.findOne({ where: { id: dto.templateId } })
    if (!template) throw new NotFoundException('Template not found')
    const entity = this.repo.create({
      template,
      user: dto.user,
      dept: dto.dept,
      status: dto.status,
      submittedAt: dto.submittedAt
    })
    return this.repo.save(entity)
  }

  async findAll(query?: { templateId?: number; status?: string }) {
    const where: any = {}
    if (query?.templateId) where.template = { id: query.templateId }
    if (query?.status) where.status = query.status
    return this.repo.find({ where, order: { submittedAt: 'DESC' } })
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } })
    if (!entity) throw new NotFoundException('Submission not found')
    return entity
  }

  async update(id: number, dto: UpdateSubmissionDto) {
    const entity = await this.findOne(id)
    if (dto.templateId) {
      const template = await this.forms.findOne({ where: { id: dto.templateId } })
      if (!template) throw new NotFoundException('Template not found')
      entity.template = template
    }
    if (dto.user !== undefined) entity.user = dto.user
    if (dto.dept !== undefined) entity.dept = dto.dept
    if (dto.status !== undefined) entity.status = dto.status
    if (dto.submittedAt !== undefined) entity.submittedAt = dto.submittedAt
    return this.repo.save(entity)
  }

  async remove(id: number) {
    const res = await this.repo.delete(id)
    if (res.affected === 0) throw new NotFoundException('Submission not found')
    return { deleted: true }
  }
}
