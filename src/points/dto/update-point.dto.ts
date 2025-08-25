import { Type } from 'class-transformer'
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator'

export class UpdatePointDto {
    @IsOptional()
    @IsMongoId()
    _id?: string

    @IsNumber()
    @IsNotEmpty()
    x: number

    @IsNumber()
    @IsNotEmpty()
    y: number
}

export class UpdateSetOfPointsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePointDto)
    points: UpdatePointDto[]
}