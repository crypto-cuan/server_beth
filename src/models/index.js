
// import * as dbs from '../util/database'
// import { SequelizeHelper } from 'sequelize-utility'
// import { Sequelize } from 'sequelize'
// const dbHelper = new SequelizeHelper(dbs, Sequelize)

// // general
// import LogUserActivity from './LogUserActivity'
// // import LogUserLogin from './logUserLogin'
// import Admin from './Admin'
// import City from './City'
// // import Clinic from './Clinic'
// import Customer from './Customer'
// import Gender from './Gender'
// import Product from './Product'
// import ProductCategory from './ProductCategory'
// import ProductImage from './ProductImage'
// import Referral from './Referral'
// import ReferralCustomer from './ReferralCustomer'
// import Role from './Role'
// import Transaction from './Transaction'
// import TransactionProduct from './TransactionProduct'
// import TransactionStatus from "./TransactionStatus"
// import UserToken from './UserToken'

// //user admin
// Admin.hasMany(LogUserActivity, { foreignKey: 'admin_id' })
// LogUserActivity.belongsTo(Admin, { foreignKey: 'admin_id' })

// // LogUserLogin.belongsTo(Admin, { foreignKey: 'admin_id' })

// Role.hasMany(Admin, { foreignKey: 'role_id'})
// Admin.belongsTo(Role, { foreignKey: 'role_id' })

// ProductCategory.hasMany(Product, {foreignKey: 'product_category_id', constraints: false, allowNull:true, defaultValue:null})
// Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id', constraints: false })

// Product.hasMany(ProductImage, {foreignKey: 'product_id', allowNull:true, defaultValue:null})
// ProductImage.belongsTo(Product, { foreignKey: 'product_id' })

// City.hasMany(Customer, {foreignKey: 'city_id', allowNull: true})
// Customer.belongsTo(City, {foreignKey: 'city_id', allowNull: true})

// Gender.hasMany(Customer, {foreignKey: 'gender_id'})
// Customer.belongsTo(Gender, {foreignKey: 'gender_id'})

// Customer.hasMany(Transaction, {foreignKey: 'customer_id'})
// Transaction.belongsTo(Customer, {foreignKey: 'customer_id'})

// Customer.hasMany(ReferralCustomer, {foreignKey: 'customer_id'})
// ReferralCustomer.belongsTo(Customer, {foreignKey: 'customer_id'})

// Referral.hasMany(ReferralCustomer, {foreignKey: 'referral_id'})
// ReferralCustomer.belongsTo(Referral, {foreignKey: 'referral_id'})

// // Clinic.hasMany(Transaction, {foreignKey: 'clinic_id'})
// // Transaction.belongsTo(Clinic, {foreignKey: 'clinic_id'})

// TransactionStatus.hasMany(Transaction, {foreignKey: 'transaction_status'})
// Transaction.belongsTo(TransactionStatus, {foreignKey: 'transaction_status'})

// TransactionProduct.belongsTo(Transaction, {foreignKey: 'transaction_id'})
// Transaction.hasMany(TransactionProduct, {foreignKey: 'transaction_id'})

// TransactionProduct.belongsTo(Product, {foreignKey: 'product_id'})
// Product.hasMany(TransactionProduct, {foreignKey: 'product_id'})

// export {
//   LogUserActivity,
//   // LogUserLogin,
//   Admin,
//   // Clinic,
//   City,
//   Customer,
//   Gender,
//   Product,
//   ProductCategory,
//   ProductImage,
//   Referral,
//   Role,
//   Transaction,
//   TransactionStatus,
//   TransactionProduct,
//   UserToken
// }

// // dbHelper.syncAllForce()
// export default dbHelper


import * as dbs from '../util/database'
import { SequelizeHelper } from 'sequelize-utility'
import { Sequelize } from 'sequelize'
const dbHelper = new SequelizeHelper(dbs, Sequelize)

// import Customer from './Customer'
// import City from './City'
// import Country from './Country'
// import CustomerAddress from './CustomerAddress'
// import Province from './Province'
// import Product from './Product'
// import ProductSpec from './ProductSpec'
// import ProductSub from './ProductSub'
// import ProductImage from './ProductImage'
// import SubProductImage from './SubProductImage'
// import Review from './Review'
// import Zipcode from './Zipcode'
// import WhatsappMessage from './WhatsappMessage'
import Kline from './Kline'
import MarketOpen from './MarketOpen'
import MarkTradeFutures from './MarkTradeFutures'

// City.belongsTo(Province, {foreignKey: 'province_id', allowNull: true})
// Province.hasMany(City, {foreignKey: 'province_id', allowNull: true})

// Province.belongsTo(Country, {foreignKey: 'country_id', allowNull: true})
// Country.hasMany(Province, {foreignKey: 'country_id', allowNull: true})

// CustomerAddress.belongsTo(Customer, {foreignKey: 'customer_id', allowNull: true})
// Customer.hasMany(CustomerAddress, {foreignKey: 'customer_id', allowNull: true})

// CustomerAddress.belongsTo(City, {foreignKey: 'city_id', allowNull: true})
// City.hasMany(CustomerAddress, {foreignKey: 'city_id', allowNull: true})

// ProductSpec.belongsTo(Product, {foreignKey: 'product_id', allowNull: true})
// Product.hasMany(ProductSpec, {foreignKey: 'product_id', allowNull: true})

// ProductSub.belongsTo(Product, {foreignKey: 'product_id', allowNull: true})
// Product.hasMany(ProductSub, {foreignKey: 'product_id', allowNull: true})

// Review.belongsTo(Product, {foreignKey: 'product_id', allowNull: true})
// Product.hasMany(Review, {foreignKey: 'product_id', allowNull: true})

// ProductImage.belongsTo(Product, {foreignKey: 'product_id', allowNull: true})
// Product.hasMany(ProductImage, {foreignKey: 'product_id', allowNull: true})

// SubProductImage.belongsTo(ProductSub, {foreignKey: 'sub_product_id', allowNull: true})
// ProductSub.hasMany(SubProductImage, {foreignKey: 'sub_product_id', allowNull: true})

export {
  // City,
  // Country,
  // Customer,
  // CustomerAddress,
  // Product,
  // ProductSpec,
  // ProductSub,
  // Province,
  // ProductImage,
  // Review,
  // SubProductImage,
  // Zipcode
  // WhatsappMessage,
  Kline,
  MarketOpen,
  MarkTradeFutures,
}

// dbHelper.sync()
// dbHelper.syncAllForce()
export default dbHelper

