import { Test, TestingModule } from '@nestjs/testing'
import { PointsService } from './points.service'
import { getModelToken } from '@nestjs/mongoose'
import { SetOfPoints } from '../schemas/point.schema'
import { Model, Types } from 'mongoose'
import { NotFoundException } from '@nestjs/common'
import { CreateSetOfPointsDto } from '../dto/create-point.dto'
import { UpdateSetOfPointsDto } from '../dto/update-point.dto'

const mockPointToUpdateId = new Types.ObjectId()
const mockPointSet = {
  _id: new Types.ObjectId(),
  points: [
    { _id: mockPointToUpdateId, x: 10, y: 20 },
    { _id: new Types.ObjectId(), x: -5, y: 15 },
  ],
  save: jest.fn().mockReturnThis(),
}

const mockSave = jest.fn().mockResolvedValue(mockPointSet)

const mockSetOfPointsModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: mockSave,
}))

describe('PointsService', () => {
  let service: PointsService
  let model: Model<SetOfPoints>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointsService,
        {
          provide: getModelToken(SetOfPoints.name),
          useValue: mockSetOfPointsModel,
        },
      ],
    }).compile()

    service = module.get<PointsService>(PointsService);
    model = module.get<Model<SetOfPoints>>(getModelToken(SetOfPoints.name))
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  describe('create()', () => {
    it('should create a new set of points and return it', async () => {
      const createDto: CreateSetOfPointsDto = { points: [{ x: 1, y: 1 }] }
      
      const result = await service.create(createDto)

      expect(mockSetOfPointsModel).toHaveBeenCalledWith(createDto)
      expect(result.save).toHaveBeenCalled();
    })
  })

  describe('findOne()', () => {
    it('should find and return a set of points by ID', async () => {
      const id = mockPointSet._id.toHexString()
      const result = await service.findOne(id)

      expect(model.findById).toHaveBeenCalledWith(id)
      expect(result).toEqual(mockPointSet)
    })

    it('should throw NotFoundException if set of points is not found', async () => {

      jest.spyOn(model, 'findById').mockReturnValue({ exec: jest.fn().mockResolvedValue(null) } as any)
      
      const id = new Types.ObjectId().toHexString()

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    })
  })

  describe('update()', () => {
    it('should update an existing point and add a new one', async () => {
      const id = mockPointSet._id.toHexString()
      const updateDto: UpdateSetOfPointsDto = {
        points: [
          { _id: mockPointToUpdateId.toHexString(), x: 99, y: 99 },
          { x: 50, y: 50 },
        ],
      }

      const mockDocumentInstance = {
        ...mockPointSet,
        points: [ ...mockPointSet.points ],
        save: jest.fn().mockReturnThis(),
      }
      jest.spyOn(model, 'findById').mockReturnValue({ exec: jest.fn().mockResolvedValue(mockDocumentInstance) } as any)
      
      const result = await service.update(id, updateDto)

      const updatedPoint = result.points.find(p => p._id.toString() === mockPointToUpdateId.toHexString())

      expect(updatedPoint).toBeDefined()
      expect(updatedPoint?.x).toBe(99)
      expect(result.save).toHaveBeenCalled()
      expect(result.points.length).toBe(3)
    })

    it('should throw NotFoundException if the set to update is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({ exec: jest.fn().mockResolvedValue(null) } as any)

      const id = new Types.ObjectId().toHexString()
      const updateDto: UpdateSetOfPointsDto = { points: [{ x: 1, y: 1 }] }

      await expect(service.update(id, updateDto)).rejects.toThrow(NotFoundException)
    })
  })
})