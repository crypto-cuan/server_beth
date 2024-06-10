import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const Country = connection1.define(
  'Country',
  {
    name: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    tableName: 'country',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Country;