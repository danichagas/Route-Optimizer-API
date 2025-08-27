import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('RoutesController (e2e)', () => {
  let app: INestApplication
  let pointSetId: string
  let calculatedRouteId: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const response = await request(app.getHttpServer())
      .post('/points')
      .set('x-api-key', 'route-optimizer-key')
      .send({ points: [{ x: 1, y: 1 }, { x: 5, y: 5 }, { x: 10, y: 10 }] })

    pointSetId = response.body.id
  })

  afterAll(async () => {
    await app.close()
  })

  it('GET /route/:id - should calculate and save an optimized route', () => {
    return request(app.getHttpServer())
      .get(`/route/${pointSetId}`)
      .set('x-api-key', 'route-optimizer-key')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('calculatedRouteId')
        expect(response.body).toHaveProperty('totalDistance')
        expect(response.body.optimizedRoute).toBeInstanceOf(Array)
        expect(response.body.optimizedRoute).toHaveLength(3)
        calculatedRouteId = response.body.calculatedRouteId
      })
  })

  it('GET /route/historic/all - should get the history of calculated routes', () => {
      return request(app.getHttpServer())
        .get('/route/historic/all')
        .set('x-api-key', 'route-optimizer-key')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body[0]).toHaveProperty('routeId')
        })
  })

  it('DELETE /route/:id - should delete a calculated route', () => {
    return request(app.getHttpServer())
      .delete(`/route/${calculatedRouteId}`)
      .set('x-api-key', 'route-optimizer-key')
      .expect(204)
  })
})