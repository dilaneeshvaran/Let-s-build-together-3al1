import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Task extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'assignedUser'});
    this.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator'});
    this.hasMany(models.Resource, { foreignKey: 'taskId', as: 'resources'});
  }
  public id!: number;
  public title!: string;
  public description!: string;
  public deadline!: Date;
  public assignedDate?: Date;
  public status!:  'ongoing' | 'completed' | 'failed';
  public userId!: number;
  public createdBy!: number;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  assignedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed', 'failed'),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: false, 
});
