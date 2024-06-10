import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const Product = connection1.define(
  'Product',
  {
    name: {
      type: DataTypes.STRING(30)
    },
    // image: {
    //   type: DataTypes.STRING
    // },
    // review_star: {
    //   type: DataTypes.INTEGER
    // },
    // review_comment: {
    //   type: DataTypes.STRING
    // },
    sku: {
      type: DataTypes.STRING
    },
    base_price: {
      type: DataTypes.INTEGER
    },
    discounted_price: {
      type: DataTypes.INTEGER
    },
    // type_id: {
    //   type: DataTypes.INTEGER
    // },
    description: {
      type: DataTypes.STRING
    },
    // material: {
    //   type: DataTypes.STRING
    // },
    // size: {
    //   type: DataTypes.STRING
    // },
    quantity: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    product_type: {
      type: DataTypes.ENUM({
        values: ['Pillow', 'Bolster Pillow']
      }),
      defaultValue: "Pillow"
    },
    seo_keyword: {
      type: DataTypes.STRING
    },
    seo_description: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    tableName: 'product',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Product;