import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class SlugPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string')
      throw new UnprocessableEntityException()

    const slug = value
      .toLowerCase()
      .replace(/éèê/g, 'e')
      .replace(/àâ/g, 'a')
      .replace(/î/g, 'i')
      .replace(/ô/g, 'o')
      .replace(/ù/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/[^A-Za-z0-9-]/g, '');

    return slug;
  }
}
