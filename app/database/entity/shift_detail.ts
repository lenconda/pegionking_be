import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('shift_detail')
export class ShiftDetail {
  @PrimaryColumn({ name: 'shift_no' })
  shiftNo: string

  @Column({ name: 'station_code' })
  stationCode: string

  @Column({ name: 'expected_arrival' })
  expectedArrival: number

  @Column({ name: 'actual_arrival' })
  actualArrival: number

  @Column({ name: 'expected_departure' })
  expectedDeparture: number

  @Column({ name: 'actual_departure' })
  actualDeparture: number
}
