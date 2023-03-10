import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDate implements PipeTransform {
  transform(date: Date, locale: string = 'en') {
    return date.toLocaleDateString(locale);
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTime implements PipeTransform {
  transform(date: Date, locale: string = 'en') {
    return date.toLocaleTimeString(locale);
  }
}

@Pipe({
  name: 'lowerfirst',
  pure: true,
})
export class LowerFirstPipe implements PipeTransform {
  transform(value: string) {
    const _char = value.charAt(0).toLocaleLowerCase();
    return `${_char}${value.substring(1)}`;
  }
}

@NgModule({
  declarations: [FormatDate, LowerFirstPipe, FormatTime],
  exports: [FormatDate, LowerFirstPipe,FormatTime],
})
export class PipesModule {}
