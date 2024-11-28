import { ApiProperty } from "@nestjs/swagger";
import { string } from "zod";
export class CreateReportScoreDto {

    id: string;

    @ApiProperty({type: String, example: '1' })
    stateId: string;

    @ApiProperty({type: Number, example: 10 })
    stateBudgetAllocation: number;

    @ApiProperty({type: Number, example: 5 })
    govSystems: number;

    @ApiProperty({type: Number, example: 3 })
    internetAvailSpeed: number;

    @ApiProperty({type: Number, example: 8 })
    levelIctReforms: number;

    @ApiProperty({type: Number, example: 6 })
    deploymentCompSystems: number;

    @ApiProperty({type: Number, example: 4 })
    startUpEcosystem: number;

    @ApiProperty({type: Number, example: 3 })
    statusStateWebsite: number;

    @ApiProperty({type: Number, example: 2 })
    staffIctProficiency: number;

    @ApiProperty({type: Number, example: 0 })
    totalScore: number;
}