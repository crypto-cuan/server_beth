import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'

const LogUserLogin = connection1.define(
  'LogUserLogin',
  {
    admin_id: {
      type: DataTypes.INTEGER
    },
    attempt_login: {
      type: DataTypes.INTEGER
    },
    blocked: {
      type: DataTypes.BOOLEAN
    },
    login_date: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'log_user_login',
    timestamps: true,
    paranoid: true,
    underscored: true
  }
)

export default LogUserLogin