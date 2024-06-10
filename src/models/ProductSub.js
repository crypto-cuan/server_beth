import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const ProductSub = connection1.define(
  'ProductSub',
  {
    product_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(30)
    },
    image: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    variant: {
      type: DataTypes.STRING
    },
    base_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    discounted_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    tableName: 'product_sub',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default ProductSub;