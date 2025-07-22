import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../db/database';

export class Product extends Model {
  public id!: string;
  public name!: object;
  public description!: object;
  public price!: number;
  public stock!: number;
  public minStock!: number;
  public isActive!: boolean;
  public images!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.JSONB,
    },
    description: {
      type: DataTypes.JSONB,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    tableName: 'products',
  },
);
