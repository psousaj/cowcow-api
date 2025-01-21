import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmptyUpdateBodyPipe implements PipeTransform {
    transform(value: any) {
        if (value === undefined || Object.keys(value).length === 0) {
            throw new BadRequestException('No data provided for update');
        }
        return value;
    }
}