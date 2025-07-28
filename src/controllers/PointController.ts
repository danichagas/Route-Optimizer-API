import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { SetOfPoints } from '../models/Point.js'

//POST
export const createSetOfPoints = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    const { points } = req.body
    const newSet = new SetOfPoints({ points })
    await newSet.save()

    res.status(201).json({
      message: 'Os pontos cadastrados foram cadastrados com sucesso!',
      id: newSet._id
    })
  } catch(error) {
    res.status(500).json({ message: 'Erro no servidor', error })
  }
}

//GET /:id
export const getSetOfPoints = async (req: Request, res: Response) => {
  try {
    const set = await SetOfPoints.findById(req.params.id)
    if(!set) {
      return res.status(404).json({ message: 'Os pontos não foram encontrados' })
    }
    res.status(200).json(set)
  } catch (error) {
    res.status(500).json({ messgae: 'Erro no servidor', error })
  }
}