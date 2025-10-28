import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Submission } from '../submissions/submission.entity'

export type FormStatus = 'active' | 'draft' | 'archived'

@Entity({ name: 'form_templates' })
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 255 })
  title!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'varchar', length: 64 })
  category!: string

  @Column({ type: 'varchar', length: 16, default: 'active' })
  status!: FormStatus

  @OneToMany(() => Submission, (s) => s.template)
  submissions!: Submission[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}
