import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceEnum } from '../models/Player';

@Pipe({
  name: 'attendance'
})
export class AttendancePipe implements PipeTransform {


  transform(value: AttendanceEnum, args?: any): string[] {
    let days : string[] = [];

    if((value & AttendanceEnum.Monday) === AttendanceEnum.Monday)
      days.push('Monday');
    if((value & AttendanceEnum.Tuesday) === AttendanceEnum.Tuesday)
      days.push('Tuesday'); 
    if((value & AttendanceEnum.Wednesday) === AttendanceEnum.Wednesday)
      days.push('Wednesday');
    if((value & AttendanceEnum.Thursday) === AttendanceEnum.Thursday)
      days.push('Thursday');
    if((value & AttendanceEnum.Friday) === AttendanceEnum.Friday)
      days.push('Friday');  
    if((value & AttendanceEnum.Saturday) === AttendanceEnum.Saturday)
      days.push('Saturday');  
    if((value & AttendanceEnum.Sunday) === AttendanceEnum.Sunday)
      days.push('Sunday');    
      
    return days;
  }

}
