import { ApiProperty } from "@nestjs/swagger";
export class CreateStateDto {
    id: string;

    @ApiProperty({type: String, description: 'The name of the state', example: 'Lagos'})
    name: string;
}
