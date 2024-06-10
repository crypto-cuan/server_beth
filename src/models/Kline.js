import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const Kline = connection1.define(
  'Kline',
  {
    symbol_name: {
      type: DataTypes.STRING(12)
    },
    open_time: {
      type: DataTypes.TIME
    },
    open_price: {
      type: DataTypes.DOUBLE
    },
    high_price: {
      type: DataTypes.DOUBLE
    },
    low_price: {
      type: DataTypes.DOUBLE
    },
    close_price: {
      type: DataTypes.DOUBLE
    },
    volume: {
      type: DataTypes.DOUBLE
    },
    close_time: {
      type: DataTypes.TIME
    },
    quote_asset_volume: {
      type: DataTypes.DOUBLE
    },
    trades_number: {
      type: DataTypes.INTEGER
    },
    bav_buy_taker: {
      type: DataTypes.DOUBLE
    },
    qav_buy_taker: {
      type: DataTypes.DOUBLE
    },
    ignore: {
      type: DataTypes.DOUBLE
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
    tableName: 'kline',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Kline;