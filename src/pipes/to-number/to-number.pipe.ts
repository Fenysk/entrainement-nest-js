import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ToNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Origin value :')
    console.log(value)

    const pipedValue = Number(value);
    
    console.log('Piped value :')
    console.log(pipedValue)

    if (isNaN(pipedValue))
      throw new UnprocessableEntityException('Validation failed :(')
    
    return pipedValue;
  }
}
