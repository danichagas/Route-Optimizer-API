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