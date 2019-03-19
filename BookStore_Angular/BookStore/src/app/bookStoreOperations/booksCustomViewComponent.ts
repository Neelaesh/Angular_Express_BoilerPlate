import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookStoreCustomViewService } from '../bookStoreData/bookStoreCustomView.service';

@Component({
    selector : 'customviewbook-app',
    templateUrl : './booksCustomView.html'
})

export class BooksCustomViewComponent implements OnInit{
    
    booksCustomViewData : any ={
        id  : false,
        title : false,
        author : false,
        isbn : false,
        publicationDate : false,
        publisher : false,
        price : false,
        genre : false,
        format : false
    }

    constructor(private _bookStoreCustomViewService : BookStoreCustomViewService,
    private route : Router){

    }

    ngOnInit(){

        this.booksCustomViewData = this._bookStoreCustomViewService.fetchViews();
        console.log(this.booksCustomViewData);
    }

    submitViews(formValue: any){

        console.log("Custom Views are ",formValue);
        this._bookStoreCustomViewService.saveViews(formValue);
        this.route.navigate(['/books']);
    }

}