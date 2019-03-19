import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    booksDeleted: number;

    constructor(private router : Router, private _bookStoreCustomViewService : BookStoreCustomViewService,
    private _bookStoreServices : BookStoreService, private activateRoute : ActivatedRoute){
        
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
                        this.booksDeleted = data.n; 
                        console.log("Books Deleted ",this.booksDeleted);
                        this.selectedBooks = [];
                    },
                    (error) => {
                        console.log("Error while Deleting book");
                        this.selectedBooks = [];
                    },
                    () => {
                        this.router.navigate(['/books'],{ relativeTo: this.activateRoute });
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
                console.log("Selected Books ",selected);
                this._bookStoreServices.deleteBook(selected).subscribe(
                    (data) => {
                        console.log("Data ",data);
                        this.booksDeleted = data.n; 
                        console.log("Books Deleted ",this.booksDeleted);
                        this.selectedBooks = [];
                    },
                    (error) => {
                        console.log("Error while Deleting book");
                        this.selectedBooks = [];
                    },
                    () => {
                        this.router.navigate(['/books'],{ relativeTo: this.activateRoute });
                    }
                ); 
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

}