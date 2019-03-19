import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookStoreCustomViewService } from '../bookStoreData/bookStoreCustomView.service';
import { BookStoreService } from '../bookStoreData/bookStoreService';

@Component({
    selector : 'viewBooks-app',
    templateUrl : './viewBooksComponent.html'
})

export class ViewBooksComponent implements OnInit{

    books : any[];
    selectedBooks : any;
    arr : any[];
    customView : any = {
        id  : true,
        title : true,
        author : true,
        isbn : true,
        publicationDate : true,
        publisher : true,
        price : true,
        genre : true,
        format : true
    };
    genresList: any[];

    constructor(private route : Router, private _bookStoreCustomViewService : BookStoreCustomViewService,
    private _bookStoreServices : BookStoreService){
        
    }

    ngOnInit(){
        
        this.books = [];
        this.customView = this._bookStoreCustomViewService.fetchViews();
        console.log("Custom Views ",this.customView);
        this.getBooks();
    }

    selectedBook(bookId:any,isSelected:any,books:any){
        
        console.log("Book ID: "+bookId+" Selected: "+isSelected);
       
        if(isSelected){
            this.selectedBooks = this.selectedBooks ? this.selectedBooks + ',' + bookId : bookId;
            console.log("Selected Book Ids: ",this.selectedBooks);
        }
        else{
            this.arr = this.selectedBooks.split(',');
            for(let i=0; i<this.arr.length; i++){
                if(this.arr[i] == bookId){
                    this.arr.splice(i,1);
                    break;
                }
            }
            this.selectedBooks=this.arr.toString();
            console.log("Selected Book Ids: ",this.selectedBooks);
        }
    }

    deleteBooks(){
        let booksToDelete : any;
        let booksArray : any;
        if(this.selectedBooks != undefined && this.selectedBooks!= ""){
            if(this.selectedBooks.includes(',')){
                booksToDelete = this.selectedBooks.split(',');
                console.log("Books to Delete ",booksToDelete);
                this._bookStoreServices.deleteBook(booksToDelete).subscribe(
                    (data) => {
                        this.books = data;
                        console.log("Remaining Books ",this.books);
                    },
                    (error) => {
                        console.log("Error while Deleting book");
                    }
                );
                booksArray = this.selectedBooks.split(',');
                for( let j=0; j< booksArray.length; j++){
                    booksArray.splice(j,1);
                }
                this.selectedBooks = [];
            }
            else{
                console.log("Book to Delete ",this.selectedBooks);
                let selected = [];
                selected.push(this.selectedBooks);
                this._bookStoreServices.deleteBook(selected).subscribe(
                    (data) => {
                        this.books = data;
                        console.log("Remaining Books ",this.books);
                    },
                    (error) => {
                        console.log("Error while Deleting book");
                    }
                ); 
                this.getBooks();
                this.selectedBooks = [];
            }
        }
        else{
            alert("Please select atleast one record to Delete");
        } 
    }

    getBooks() {
        this._bookStoreServices.getBooks().subscribe((data ) => {
            this.books = data;
            console.log("Books from Express ",this.books);
        },
        (error) => {
            console.log("Error while fetching Books");
        }
        );
    }

    deleteBook(books){
        
    }

}