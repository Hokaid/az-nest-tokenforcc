import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Comercio extends Model {
  @Column
  comercio_id: string;
}
