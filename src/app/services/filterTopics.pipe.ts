import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'filterTopics'})
export class filterTopics implements PipeTransform {
  transform(value: any[], args: string): any[] {
    if(args !== "" && args !== undefined && args !== null){
        console.log('test 1')
    return  value.filter(topic => topic.subject.includes(args) || topic.content.includes(args));
    }
    console.log('test 2')
    return  value;
  }
}

@Pipe({name: 'sortTopics'})
export class sortTopics implements PipeTransform {
  transform(value: any[], args: any): any[] {
    if(args === "views"){
        return  value.sort((a,b) => {
            let objectA: number|any = '';
            let objectB: number|any = '';
            [objectA, objectB] = [a[args], b[args]];
            return typeof objectA === 'string' ? objectA.localeCompare(objectB) : objectB - objectA;
        });
    } else if (args === "replies"){
        return  value.sort((a,b) => {
            let objectA: number|any = '';
            let objectB: number|any = '';
            [objectA, objectB] = [a[args], b[args]];
            return typeof objectA.length === 'string' ? objectA.length.localeCompare(objectB.length) : objectB.length - objectA.length;
        });
    }
    return value;
  }
}