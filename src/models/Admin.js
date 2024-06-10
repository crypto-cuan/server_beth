import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import JWT from 'jsonwebtoken'

const Admin = connection1.define(
  'Admin',
  {
    auth_id: {
      type: DataTypes.STRING,
      unique: true
    },
    role_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    mobile_phone: {
      type: DataTypes.STRING(30)
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `email must be in correct format`
        },
        isUnique: function(value, cb) {
          const Op = require('sequelize').Op
          Admin.findOne({where: {id: {[Op.ne]: this.id}, email: value}})
            .then(user => {
              if(user) {
                cb(`email already taken`)
              }
              else {
                cb()
              }
            })
            .catch((err) => {err})
        }
      }
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN
    },
    photo: {
      type: DataTypes.STRING,
      // unique: true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    hooks: {
      beforeCreate: (instance, options) => {
        const { generatePassword } = require('../helpers/password')
        generatePassword(instance.email, instance.password)
        .then(function(newPassword){
          Admin.update(
            {
              password: newPassword,
            },
            {where : { email : instance.email }}
            )
            .then( (user) => {
              console.log("== validation password success", user);
            })
            .catch( (err) => {
              console.log("== validation passowrd failed", err);
            })
        })
      },
    },
    tableName: 'admin',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

Admin.prototype.generateJWT = function() {
  const { id, role_id } = this
  const credentials = { id, role_id }
  const token = JWT.sign(credentials, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '24h'
  }) // Expiration Date For One Month
  return token
}

export default Admin
