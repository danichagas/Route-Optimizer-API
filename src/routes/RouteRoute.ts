import { Router } from 'express'
import { getOptimizerRoute, getHistoricRoute, deleteRoute } from '../controllers/RouteController.js'

const router = Router()

router.get('/historic', getHistoricRoute)
router.get('/:id', getOptimizerRoute)
router.delete('/:id', deleteRoute)

export default router