import '../util/initEnv'

import Sequelize from 'sequelize'
import { connection1 } from '../util/database'
import _ from 'lodash'

const LogUserActivity = connection1.define(
  'LogUserActivity',
  {
    admin_id : {
      type : Sequelize.INTEGER
    },
    activity_name : {
      type : Sequelize.STRING(255),
      allowNull : false
    },
    activity_url : {
      type : Sequelize.STRING(255),
      allowNull : false
    },
    activity_description : {
      type : Sequelize.STRING(255)
    },
    activity_req : {
      type : Sequelize.JSON,
      allowNull : false
    },
    activity_header : {
      type : Sequelize.JSON,
      allowNull : false
    },
    ip_user : {
      type : Sequelize.STRING(16),
      allowNull : false
    },
    created_at : {
      type : 'TIMESTAMP',
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    timestamps : false,
    tableName : 'log_user_activity'
  }
)

export default LogUserActivity
