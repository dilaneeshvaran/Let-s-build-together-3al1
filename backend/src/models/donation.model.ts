import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Donation extends Model {
  public donationId!: number;
  public amount!: number;
  public donationDate!: Date;
  public donorId!: number;
  public paymentMethod!: string;
  public status!: 'pending' | 'confirmed' | 'cancelled';
}

Donation.init({
  donationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  donationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'memberId'
    }
  }, 
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Donation',
  tableName: 'donations',
  timestamps: false
});

Member.hasMany(Donation, { foreignKey: 'donorId' });