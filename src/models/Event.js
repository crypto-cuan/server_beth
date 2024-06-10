import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const Event = connection1.define(
  'Event',
  {
    name: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.STRING(5000)
    },
    image_url: {
      type: DataTypes.STRING(10000)
    },
    tag: {
      type: DataTypes.STRING(100)
    },
    price: {
      type: DataTypes.NUMBER
    },
    discount: {
      type: DataTypes.NUMBER
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    tableName: 'event',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Event;