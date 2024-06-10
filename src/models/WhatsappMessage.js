import '../util/initEnv'
import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
// import { ENUM } from 'sequelize';
connection1
  .authenticate()
  .then(function(err) {
      console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
      console.log('Unable to connect to the database:', err);
  });

const WhatsappMessage = connection1.define(
  'WhatsappMessage',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING
    },
    sender_number: {
      type: DataTypes.STRING
    },
    receiver_number: {
      type: DataTypes.STRING
    },
    ip_address: {
      type: DataTypes.STRING
    },
    entry_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.TIME
    },
    updated_at: {
      type: DataTypes.TIME
    },
  },
  {
    tableName: 'whatsapp_message',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default WhatsappMessage;