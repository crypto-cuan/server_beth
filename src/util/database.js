import '../util/initEnv'

import { debugDB } from '../util/debug'
import { Sequelize } from 'sequelize'
import config from 'config'
import fs from 'fs';

export const connection1 = new Sequelize({
  host: config.get('moduleSpecific.clinic.db.host'),
  username: config.get('moduleSpecific.clinic.db.user'),
  password: process.env.DB_PASS,
  port: config.get('moduleSpecific.clinic.db.port'),
  database: config.get('moduleSpecific.clinic.db.name'),
  dialect: config.get('moduleSpecific.clinic.db.dialect'),
  ssl: false,
  // dialectOptions: {
  //   ssl: {
  //     // require: true,
  //     rejectUnauthorized: false
  //   }
  // },
  logging: console.log,
  // logging: false,
  // logging: true,
  timezone: '+07:00',
  pool: {
    max: 10,
    acquire: 40000,
    idle: 10000,
    evict: 1000
  },
  // define: {
  //   underscored: true,
  //   timestamps: true
  // }
  // ssl: true,
  // dialectOptions: {
  //   ssl: {
  //     ca: fs.readFileSync(__dirname + '/key/ca-certificate-devdb-v2.crt')
  //   }
  // }
})
