import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Facility } from './facility.entity'

@Entity('facility_audit_log')
export class FacilityAuditLog {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Facility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'facility_id' })
  facility!: Facility

  @Column({ type: 'varchar', length: 50 })
  action!: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  performed_by!: string | null

  @Column({ type: 'text', nullable: true })
  note!: string | null

  @CreateDateColumn()
  performed_at!: Date
}
