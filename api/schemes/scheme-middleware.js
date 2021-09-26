const db = require('../../data/db-config.js')

const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db('schemes')
    .where('scheme_id', req.params.scheme_id)
    .first()

    if (!existing) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body
  if(scheme_name === undefined || typeof scheme_name !== 'string' || !scheme_name.trim()){
      next({
        status: 400,
        message: 'invalid scheme_name'
      })
  } else {
    next()
  }

}

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body

  if(instructions === undefined || 
    typeof instructions !== 'string' || 
    !instructions.trim() || 
    typeof step_number !== 'number' || 
    step_number < 1
    ) {
      const error = { status: 404, message: 'invalid step'}
      next(error)
    }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
