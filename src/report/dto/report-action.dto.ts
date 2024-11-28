import { ApiProperty } from "@nestjs/swagger"

export class ReportActionDto{
    @ApiProperty({type: String, example: 'publish || decline || delete || view' })
    action: string
}
  