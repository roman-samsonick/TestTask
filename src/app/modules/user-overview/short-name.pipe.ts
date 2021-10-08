import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(value: IUser): string {
    return `${value.firstName} ${value.lastName[0]}.`;
  }

}
