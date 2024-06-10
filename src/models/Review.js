import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';

const Review = connection1.define(
  'Review',
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    review_star: {
      type: DataTypes.INTEGER
    },
    review_comment: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'review',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default Review;