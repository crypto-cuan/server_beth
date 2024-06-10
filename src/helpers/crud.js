import response from '../util/response/response'
import flag from '../util/flag/errorCode_v2'

/**
 * CRUD Helper
 * This is for resuable basic crud
 */
export default class Crud {
  constructor(module, model) {
    this.module = module
    this.model = model
  }

  /**
   * Handler => for bind to props and can access from router
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getData = (req, res, next) => {
    this.getDataFacade(req, res, next)
  }

  getDataByID = (req, res, next) => {
    this.getDataByIDFacade(req, res, next)
  }

  insertData = (req, res, next) => {
    this.insertDataFacade(req, res, next)
  }

  updateData = (req, res, next) => {
    this.updateDataFacade(req, res, next)
  }

  deleteData = (req, res, next) => {
    this.deleteDataFacade(req, res, next)
  }

  /**
   * Facade => for bussines logic, reusable crud
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getDataFacade(req, res, next) {
    try {
      const data = await this.model.findAll()
      if (!data)
        return response.notFound(
          `There's no data ${this.module}`,
          res,
          flag.request.empty_data
        )
      return response.success(`Get ${this.module} success`, res, data)
    } catch (err) {
      next(err)
    }
  }

  async getDataByIDFacade(req, res, next) {
    try {
      const { id } = req.params
      const data = await this.model.findByPk(id)
      if (!data)
        return response.notFound(
          `There's no data ${this.module} for this id`,
          res,
          flag.request.empty_data
        )
      return response.success(`Get ${this.module} by id success`, res, data)
    } catch (err) {
      next(err)
    }
  }

  async insertDataFacade(req, res, next) {
    try {
      const data = await this.model.create(req.body)
      return response.success(`Insert ${this.module} success`, res, data)
    } catch (err) {
      next(err)
    }
  }

  async updateDataFacade(req, res, next) {
    try {
      const { id, ...dataUpd } = req.body
      const data = await this.model.update(dataUpd, {
        where: { id },
        returning: true
      })
      return response.success(`Update ${this.module} success`, res, data[1])
    } catch (err) {
      next(err)
    }
  }

  async deleteDataFacade(req, res, next) {
    try {
      const { id } = req.params
      const data = await this.model.destroy({
        where: { id }
      })
      return response.success(`Delete ${this.module} success`, res, data)
    } catch (err) {
      next(err)
    }
  }
}
