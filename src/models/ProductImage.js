import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const ProductImage = connection1.define(
  'ProductImage',
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    sequence: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: 'product_image',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default ProductImage;