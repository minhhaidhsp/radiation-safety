import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type FacilityStatus = 'new' | 'pending' | 'approved' | 'rejected'

@Entity('facility')
export class Facility {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', unique: true })
  facility_code!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar', nullable: true })
  tax_code!: string | null

  @Column({ type: 'varchar' })
  type!: string

  @Column('text')
  address!: string

  @Column({ type: 'varchar' })
  legal_representative!: string

  @Column({ default: 0 })
  device_count!: number

  @Column('text', { array: true, nullable: true })
  device_types!: string[] | null

  @Column({ type: 'text', nullable: true })
  purpose!: string | null

  @Column({ type: 'varchar' })
  radiation_officer!: string

  @Column({ type: 'varchar', nullable: true })
  license_number!: string | null

  @Column({ type: 'varchar', nullable: true })
  certificate_number!: string | null

  @Column({ type: 'date', nullable: true })
  certificate_date!: Date | null

  @Column({ type: 'jsonb', nullable: true })
  attachments!: Record<string, string> | null

  @Column({ type: 'varchar', default: 'pending' })
  status!: FacilityStatus

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}
