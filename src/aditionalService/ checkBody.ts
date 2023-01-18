import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AditionalService {
  checkBody(obgDto, body) {
    for (const propName in obgDto) {
      console.log('+++++', obgDto);
      console.log('-----', body);
      if (!body.hasOwnProperty(propName)) {
        throw new HttpException(
          `${propName} must be required`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return true;
    }
  }
}
