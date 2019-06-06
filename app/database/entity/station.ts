import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('station')
export class Station {
  @Column({ name: 'name' })
  name: string

  @PrimaryColumn({ name: 'code' })
  code: string
}
