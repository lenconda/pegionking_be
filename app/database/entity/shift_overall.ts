import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('shift_overall')
export class ShiftOverall {
  @PrimaryColumn({ name: 'id' })
  id: number

  @Column({ name: 'shift_no' })
  shiftNo: string

  @Column({ name: 'shift_code' })
  shiftCode: string

  @Column({ name: 'start_station' })
  startStation: string

  @Column({ name: 'start_time' })
  startTime: Date

  @Column({ name: 'end_station' })
  endStation: string

  @Column({ name: 'end_time' })
  endTime: Date
}
