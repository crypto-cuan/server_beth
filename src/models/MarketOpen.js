import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const MarketOpen = connection1.define(
  'MarketOpen',
  {
    name: {
      type: DataTypes.STRING(40)
    },
    is_open: {
      type: DataTypes.BOOLEAN
    },
    start_point: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.TIME
    },
    updated_at: {
      type: DataTypes.TIME
    },
    deleted_at: {
      type: DataTypes.TIME
    },
  },
  {
    tableName: 'market_open',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default MarketOpen;