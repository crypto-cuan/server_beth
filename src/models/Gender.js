import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const Gender = connection1.define(
  'Gender',
  {
    name: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'gender',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Gender;