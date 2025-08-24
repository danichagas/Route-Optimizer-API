import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'

export class PointDto {
    @IsNumber()
    @IsNotEmpty()
    x: number

    @IsNumber()
    @IsNotEmpty()
    y: number
}

export class CreateSetOfPointsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PointDto)
    points: PointDto[]
}