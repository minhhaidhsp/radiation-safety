import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { FormTemplate } from './form-template.entity'
import { CreateFormDto } from './dto/create-form.dto'
import { UpdateFormDto } from './dto/update-form.dto'

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FormTemplate)
    private readonly repo: Repository<FormTemplate>
  ) {}

  async create(dto: CreateFormDto) {
    const entity = this.repo.create(dto)
    return this.repo.save(entity)
  }

  async findAll(query?: { q?: string; category?: string; status?: string }) {
    const where: any = {}
    if (query?.q) {
      where.title = ILike(`%${query.q}%`)
    }
    if (query?.category && query.category !== 'all') {
      where.category = query.category
    }
    if (query?.status) {
      where.status = query.status
    }
    return this.repo.find({ where, order: { updatedAt: 'DESC' } })
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } })
    if (!entity) throw new NotFoundException('Form not found')
    return entity
  }

  async update(id: number, dto: UpdateFormDto) {
    const entity = await this.findOne(id)
    Object.assign(entity, dto)
    return this.repo.save(entity)
  }

  async remove(id: number) {
    const res = await this.repo.delete(id)
    if (res.affected === 0) throw new NotFoundException('Form not found')
    return { deleted: true }
  }
}
