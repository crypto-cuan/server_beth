import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const Zipcode = connection1.define(
  'Zipcode',
  {
    postal_code: {
      type: DataTypes.STRING
    },
    district_name: {
      type: DataTypes.STRING
    },
    urban_name: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    city_id: {
      type: DataTypes.INTEGER
    },
  },
  {
    tableName: 'zipcode',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Zipcode;