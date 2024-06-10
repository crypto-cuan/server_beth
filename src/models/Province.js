import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const Province = connection1.define(
  'Province',
  {
    name: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    country_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'province',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Province;