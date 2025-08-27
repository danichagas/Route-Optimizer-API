import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('PointsController (e2e)', () => {
  let app: INestApplication
  let createdPointSetId: string
  let pointIdToUpdate: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /points - should create a new set of points', () => {
    return request(app.getHttpServer())
      .post('/points')
      .set('x-api-key', 'route-optimizer-key')
      .send({
        points: [
          { x: 10, y: 20 },
          { x: 0, y: 0 },
        ],
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
        createdPointSetId = response.body.id
      })
  })

  it('POST /points - should fail without api-key', () => {
    return request(app.getHttpServer())
        .post('/points')
        .send({ points: [{ x: 1, y: 1 }] })
        .expect(401)
  })

  it('GET /points/:id - should get a set of points by id', () => {
    return request(app.getHttpServer())
      .get(`/points/${createdPointSetId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id', createdPointSetId)
        expect(response.body.points).toHaveLength(2)
        pointIdToUpdate = response.body.points[0]._id
      })
  })

  it('PATCH /points/:id - should update a set of points', () => {
    return request(app.getHttpServer())
      .patch(`/points/${createdPointSetId}`)
      .set('x-api-key', 'route-optimizer-key')
      .send({
        points: [
          { _id: pointIdToUpdate, x: 99, y: 99 },
          { x: 50, y: 50 }
        ]
      })
      .expect(200)
      .then((response) => {
        expect(response.body.points).toHaveLength(3)
        const updatedPoint = response.body.points.find(p => p._id === pointIdToUpdate)
        expect(updatedPoint.x).toBe(99)
      })
  })
})