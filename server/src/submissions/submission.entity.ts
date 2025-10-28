import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { FormTemplate } from '../forms/form-template.entity'

@Entity({ name: 'submissions' })
export class Submission {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => FormTemplate, (t) => t.submissions, { eager: true, onDelete: 'CASCADE' })
  template!: FormTemplate

  @Column({ type: 'varchar', length: 128 })
  user!: string

  @Column({ type: 'varchar', length: 128 })
  dept!: string

  @Column({ type: 'varchar', length: 64 })
  status!: string

  @CreateDateColumn({ type: 'timestamptz' })
  submittedAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}
