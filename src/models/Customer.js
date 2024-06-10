import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import { ENUM } from 'sequelize';
import JWT from 'jsonwebtoken'

const Customer = connection1.define(
  'Customer',
  {
    name: {
      type: DataTypes.STRING
    },
    mobile_phone: {
      type: DataTypes.STRING(30)
    },
    password: DataTypes.STRING,
    // mobile_phone: {
    //   type: DataTypes.STRING(30)
    // },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `email must be in correct format`
        },
        isUnique: function(value, cb) {
          const Op = require('sequelize').Op
          Customer.findOne({where: {id: {[Op.ne]: this.id}, email: value}})
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
    // gender_id: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 1
    // },
    // birthdate: {
    //   type: DataTypes.STRING
    // },
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
          Customer.update(
            {
              password: newPassword,
            },
            {where : { email : instance.email }}
            )
            .then( (user) => {
              // console.log("== validation password success", user);
            })
            .catch( (err) => {
              // console.log("== validation passowrd failed", err);
            })
        })
      },
    },
    tableName: 'customer',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

Customer.prototype.generateJWT = function() {
  const { id, name } = this
  const credentials = { id, name }
  const token = JWT.sign(credentials, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '24h'
  }) // Expiration Date For One Month
  return token
}

export default Customer;