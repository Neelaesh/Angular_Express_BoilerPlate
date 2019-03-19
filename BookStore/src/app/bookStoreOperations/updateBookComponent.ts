import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BookStoreService } from '../bookStoreData/bookStoreService';

@Component({
    selector : 'updateBook-app',
    templateUrl : './updateBookComponent.html'
})

export class UpdateBookComponent implements OnInit{

    bookGenres : any[];
    bookFormats : any[];
    bookDetailsToUpdate = {
        id: '',
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
        publisher: '',
        price: '',
        genre: '',
        format: ''
    };
    bookIdToUpdate : any;

    constructor(private activatedRoute : ActivatedRoute, private route : Router, private http : HttpClientModule, 
        private _bookStoreServices : BookStoreService){}

    ngOnInit(){

        this.getGenres();
        this.getFormats();
        console.log(this.activatedRoute.params);
        this.activatedRoute.params.forEach((params : Params) => {
            this.bookIdToUpdate = params['id'];
            console.log("Book ID to be updated ",this.bookIdToUpdate);
        });
        this.getBook(this.bookIdToUpdate);
        //this.bookDetailsToUpdate.format = this.bookDetailsToUpdate.format.toString();
    }

    updateBook(form){

        console.log("Update Book Contents ",form);
        let bookToBeUpdated = {
            id : this.bookIdToUpdate,
            title: form.title,
            author: form.author,
            isbn: form.isbn,
            publicationDate: form.publicationDate,
            publisher: form.publisher,
            price: form.price,
            genre: form.genre,
            format: form.format
        };
        this._bookStoreServices.updateBook(bookToBeUpdated).subscribe(
            (result) => {
                this.route.navigate(['/books']);
            },
            (error) => {
                console.log("Error ",error);
            }
        ); 
    }

    getGenres(){
        this._bookStoreServices.getGenres().subscribe((data) => {
            this.bookGenres = data;
            console.log("Book Genres ",this.bookGenres);
        },
        (error) =>{
            console.log("Error while fetching Book Genres");
        }
        );
    }

    getFormats(){
        this._bookStoreServices.getFormats().subscribe((data) =>{
            this.bookFormats = data;
            console.log("Book Formats ",this.bookFormats);
        },
        (error) =>{
            console.log("Error while fetching Book Formats");
        }
        );
    }

    getBook(bookId){
        this._bookStoreServices.getBook(bookId).subscribe(
            (data) => {
                console.log("Book to be updated ",data);
                this.bookDetailsToUpdate.id = data.id;
                this.bookDetailsToUpdate.title = data.title;
                this.bookDetailsToUpdate.author = data.author;
                this.bookDetailsToUpdate.isbn = data.isbn;
                this.bookDetailsToUpdate.publicationDate = data.publicationDate;
                this.bookDetailsToUpdate.publisher = data.publisher;
                this.bookDetailsToUpdate.price = data.price;
                this.bookDetailsToUpdate.genre = data.genre;
                this.bookDetailsToUpdate.format = data.format;
            },
            (error) => {
                console.log("Error");
            }
        );
    }
}