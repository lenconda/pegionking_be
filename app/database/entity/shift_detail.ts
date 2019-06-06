import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('shift_detail')
export class ShiftDetail {
  @PrimaryColumn({ name: 'shift_no' })
  shiftNo: string

  @Column({ name: 'station_code' })
  stationName: string

  @Column({ name: 'expected_arrival' })
  expectedArrival: string

  @Column({ name: 'actual_arrival' })
  actualArrival: string

  @Column({ name: 'expected_departure' })
  expectedDeparture: string

  @Column({ name: 'actual_departure' })
  actualDeparture: string
}
