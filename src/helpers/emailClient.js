const nodemailer = require('nodemailer')

const options = {
  service: 'SendGrid',
  auth: {
    user: 'haloryn',
    pass: 'br4inWashed!'
  }
}

const client = nodemailer.createTransport(options)

class Email {
  constructor(recipient, subject, html, attach) {
    this.email = {}
    this.email.from = 'info@kefir.com'
    this.email.to = recipient
    this.email.subject = subject
    this.email.html = html
    this.email.attachments = attach
  }

  send() {
    return client.sendMail(this.email)
  }
}

Email.prototype.templates = require('../util/template/voucher')
module.exports = Email
