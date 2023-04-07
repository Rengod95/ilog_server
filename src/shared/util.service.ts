import { Injectable } from '@nestjs/common';
import { validateHeaderValue } from 'http';

@Injectable()
export class UtilService {
  constructor() {}
  public isEmpty<TValue = unknown>(value: TValue): boolean {
    console.log(value);
    if (value === null || value === undefined) {
      console.log('null || undefined');

      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      console.log('string');

      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      console.log('empty array');

      return true;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      console.log('empty object');

      return true;
    }

    return false;
  }
}
