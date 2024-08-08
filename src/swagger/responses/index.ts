import { ApiProperty } from '@nestjs/swagger'

export class BadRequestResponse {
  @ApiProperty()
  message: string
}

export class UnauthorizedResponse {
  @ApiProperty()
  message: string
}

export class ForbiddenResponse {
  @ApiProperty()
  message: string
}

export class NotFoundResponse {
  @ApiProperty()
  message: string
}

export class UnprocessableEntityResponse {
  @ApiProperty()
  message: string

  @ApiProperty()
  details: Record<string, string[]>
}

export class InternalServerErrorResponse {
  @ApiProperty()
  message: string
}
