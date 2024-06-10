import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const WhatsappWebhook = connection1.define(
  'WhatsappWebhook',
  {
    name: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    province_id: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'city',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)
// console.log("==connection1: ", connection1)

export default WhatsappWebhook;