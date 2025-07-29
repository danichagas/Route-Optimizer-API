import { Router } from 'express'
import { getOptimizerRoute, getHistoricRoute, deleteRoute } from '../controllers/RouteController.js'

const router = Router()

router.get('/:id', getOptimizerRoute)
router.get('/historic', getHistoricRoute)
router.delete('/:id', deleteRoute)

export default router