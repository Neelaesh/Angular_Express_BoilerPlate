import { Pipe,PipeTransform } from '@angular/core';

@Pipe({name:'bookNameFilter'})
export class BookNameFilterPipe implements PipeTransform{
    transform(value: any[], args: String) : any[]{
        let filter: String = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((book) => 
        book.title.toLocaleLowerCase().startsWith(filter)  == true  ) : value;
    }
}
