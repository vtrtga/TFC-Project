import { compare } from 'bcryptjs';

const bcryptCompare = (
  reqPassword: string,
  dbPassword: string,
): any => compare(reqPassword, dbPassword);

export default bcryptCompare;
