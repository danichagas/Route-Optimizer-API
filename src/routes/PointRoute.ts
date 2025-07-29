import { Router } from 'express'
import { body } from 'express-validator'
import { createSetOfPoints, getSetOfPoints, updateSetOfPoints } from '../controllers/PointController.js'

const router = Router()

const pointValidationRules = [
  body('points').isArray({ min: 1 }).withMessage('Os pontos não pode ser um array vazio!'),
  body('points.*.name').notEmpty().withMessage('O campo "nome" é obrigatório!'),
  body('points.*.x').isNumeric().withMessage('A coordenada "x" deve ser um número!'),
  body('points.*.y').isNumeric().withMessage('A coordenada "y" deve ser um número!')
]

router.post('/', pointValidationRules, createSetOfPoints)
router.get('/:id', getSetOfPoints)
router.patch('/:id', [
  body('points').isArray({ min: 1 }),
  body('points.*.name').notEmpty(),
  body('points.*.x').isNumeric(),
  body('points.*.y').isNumeric()
], updateSetOfPoints)

export default router