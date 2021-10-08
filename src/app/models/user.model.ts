export interface IEducation {
  readonly name: string;
  readonly from: string;
  readonly to: string;
  readonly speciality: string;
}

export interface IUser {
  readonly id: string;
  readonly image: string;
  readonly username: string;
  readonly role: string;
  readonly firstName: string,
  readonly lastName: string;
  readonly education: IEducation[];
  readonly age: number;
}
