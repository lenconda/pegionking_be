import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('shift_detail')
export class ShiftDetail {
  @PrimaryColumn({ name: 'shift_no' })
  shiftNo: string

  @Column({ name: 'station_code' })
  stationCode: string

  @Column({ name: 'expected_arrival' })
  expectedArrival: Date

  @Column({ name: 'actual_arrival' })
  actualArrival: Date

  @Column({ name: 'expected_departure' })
  expectedDeparture: Date

  @Column({ name: 'actual_departure' })
  actualDeparture: Date
}
