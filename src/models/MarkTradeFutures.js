import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const MarkTradeFutures = connection1.define(
  'MarkTradeFutures',
  {
    symbol_name: {
      type: DataTypes.STRING(15)
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DOUBLE
    },
    price: {
      type: DataTypes.DOUBLE
    },
    mark_position_id: {
      type: DataTypes.INTEGER
    },
    trade_time: {
      type: DataTypes.TIME
    },
    aggregate_trade_id: {
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
    tableName: 'mark_trade_futures',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default MarkTradeFutures;