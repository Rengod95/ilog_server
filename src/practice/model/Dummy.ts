import { ICreateDummyDto } from './../dto/create-dummy.dto';

export type Dummy = {
  dummyid: string;
} & ICreateDummyDto;
