import { Injectable } from '@angular/core';

import { BooksCustomViewLocalStore } from './bookStoreCustomView.localStorage';

@Injectable()
export class BookStoreCustomViewService extends BooksCustomViewLocalStore{

    constructor(){
        super();
        this.load();
    }

    /**
     * Method to Save View
     */
    saveViews(savedViews){
        this.saveView(savedViews);
    }

    /**
     * Method to Fetch Views
     */
    fetchViews(){
        return this.getView();
    }

}