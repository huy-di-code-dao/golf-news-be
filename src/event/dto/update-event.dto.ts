import { PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './create-event.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
