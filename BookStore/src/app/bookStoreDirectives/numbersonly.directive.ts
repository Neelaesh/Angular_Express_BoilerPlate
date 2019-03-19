import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector : '[numbersOnly]'
})

export class NumbersOnly{

    private regExp : RegExp = new RegExp('^[0-9]+$');

    private specialKeys : Array<String> = ['Tab','Backspace','Home','End','Delete'];

    constructor(private el: ElementRef){

        console.log("Inside Numbers Only Directive");
    }

    @HostListener('keydown',['$event'])
    onkeyDown(event : KeyboardEvent)
    {
        console.log("Current Value ",event.key);
        if(this.specialKeys.indexOf(event.key) != -1){
            return;
        }
        let previousValue : string = this.el.nativeElement.value;
        console.log("Previous Value ",previousValue);
        let fullValue : string = previousValue.concat(event.key);
        console.log("Full Value ",fullValue);
        if(!String(fullValue).match(this.regExp)){
            event.preventDefault();
        }
    }

}