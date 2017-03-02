import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the Entries pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'entries',
  pure: true
})
export class Entries implements PipeTransform {
  transform(value, args:string[]) : any {
    let entries = [];
    for (let key in value) {
      entries.push({key: key, value: value[key]});
    }
    return entries;
  }
}