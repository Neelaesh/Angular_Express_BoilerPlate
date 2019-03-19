import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector : '[alphabetsSpacesOnly]'
})

export class AlphabetsSpacesOnly{
    
    private regExp : RegExp = new RegExp('^[a-zA-Z ]+$');

    private specialKeys : Array<String> = ['Tab','Backspace','Home','End','Delete'];

    constructor(private el: ElementRef){
        console.log("Inside AlphabetsSpaces Only Directive ");
    }

    @HostListener('keydown',['$event'])
    onkeydown(event : KeyboardEvent){

        console.log("Current Value ",event.key);
        if(this.specialKeys.indexOf(event.key) !== -1){
            return;
        }
        let previousValue : string = this.el.nativeElement.value;
        console.log("Previous Value ",previousValue);
        let fullValue :string  = previousValue.concat(event.key);
        if(!String(fullValue).match(this.regExp)){
            event.preventDefault();
        }
    }
}