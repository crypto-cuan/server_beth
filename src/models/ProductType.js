import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const ProductType = connection1.define(
  'ProductType',
  {
    name: {
      type: DataTypes.STRING(30)
    },
  },
  {
    tableName: 'product_type',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default ProductType;