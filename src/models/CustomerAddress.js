import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const CustomerAddress = connection1.define(
  'CustomerAddress',
  {
    name: {
      type: DataTypes.STRING(200)
    },
    address: {
      type: DataTypes.STRING(200)
    },
    customer_id: {
      type: DataTypes.INTEGER
    },
    city_id: {
      type: DataTypes.INTEGER
    },
    mobile_phone: {
      type: DataTypes.STRING(30)
    },
    zipcode: {
      type: DataTypes.STRING(10)
    },
    // zipcode_id: {
    //   type: DataTypes.INTEGER
    // },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    tableName: 'customer_address',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default CustomerAddress;