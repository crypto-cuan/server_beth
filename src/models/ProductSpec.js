import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const ProductSpec = connection1.define(
  'ProductSpec',
  {
    name: {
      type: DataTypes.STRING
    },
    detail: {
      type: DataTypes.STRING
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'product_spec',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default ProductSpec;