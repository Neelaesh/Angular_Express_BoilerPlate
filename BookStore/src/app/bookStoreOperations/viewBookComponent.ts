import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BookStoreService } from '../bookStoreData/bookStoreService';

@Component({
    selector : 'viewBooks-app',
    templateUrl : './viewBookComponent.html'
})

export class ViewBookComponent implements OnInit{

    allBookDetails : any[];
    id : any;
    title : any;
    author : any;
    isbn : any;
    publicationDate : any;
    publisher : any;
    price : any;
    genre : any;
    format : any;
    bookDetail : any[];

    constructor(private route: ActivatedRoute, private location: Location, private http : HttpClientModule, 
    private _bookStoreServices : BookStoreService){
        
    }

    ngOnInit(){
        console.log("Route ",this.route);
        this.route.params.forEach((params: Params)=>{
            this.id = params['id'];
            console.log("Book ID: ",this.id);
        });
        this.getBooks();
        this.getBook(this.id);
    }

    goBack(){
        this.location.back();
    }

    getBooks() {
        this._bookStoreServices.getBooks().subscribe((data ) => {
            this.allBookDetails = data;
            console.log("Books from Express ",this.allBookDetails);
        },
        (error) => {
            console.log("Error while fetching Books");
        }
        );
    }

    getBook(bookId){
        this._bookStoreServices.getBook(bookId).subscribe((data) => {
            this.bookDetail = data;
            console.log(this.bookDetail);
            this.title = data.title;
            this.author = data.author;
            this.isbn = data.isbn;
            this.publicationDate = data.publicationDate;
            this.publisher = data.publisher;
            this.price = data.price;
            this.genre = data.genre;
            this.format = data.format;
        },
        (error) => {
            console.log("Error while fetching book details");
        }
        );
    }
}