import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BookStoreService } from '../bookStoreData/bookStoreService';

@Component({
    selector : 'addBook-app',
    templateUrl : './addBookComponent.html'
})

export class AddBookComponent implements OnInit{
    
    bookGenres: any[];
    bookFormats : any[];
    book = {
        id  : '',
        title : '',
        author : '',
        isbn : '',
        publicationDate : '',
        publisher : '',
        price : '',
        genre : '',
        format : ''
    }
    books : any[];

    constructor(private route: Router, private http : HttpClientModule, 
        private _bookStoreServices : BookStoreService){}

    ngOnInit(){
        this.getGenres();
        this.getFormats();
    }

    addBook(form){

        console.log("Add New Book Contents ",form);
        let newBook = {
            id: '',
            title: form.title,
            author: form.author,
            isbn: form.isbn,
            publicationDate: form.publicationDate,
            publisher: form.publisher,
            price: form.price,
            genre: form.genre,
            format: form.format
        };
        this._bookStoreServices.saveBook(newBook).subscribe(
            (result) => {
                this.route.navigate(['/books']);
            },
            (error) => {
                console.log("Error");
            }
        );
        
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
}