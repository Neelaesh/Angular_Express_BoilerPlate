import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BookStoreService } from '../bookStoreData/bookStoreService';
import { Subscription } from 'rxjs';

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
    lastBookId: number;
    lastBooksubscription : Subscription;
    saveBooksubscription : Subscription;
    getBookssubscription : Subscription;
    getGenressubscription: Subscription;
    getFormatssubscription: Subscription;

    constructor(private route: Router, private http : HttpClientModule, 
        private _bookStoreServices : BookStoreService){}

    ngOnInit(){
        this.getGenres();
        this.getFormats();
        this.lastBooksubscription = this._bookStoreServices.getLastBook().subscribe(
            (data)=> {
                this.lastBookId = data['id'];
                console.log("Last Book Id ",this.lastBookId);
            },
            (err) =>{
                console.log("Error while fetching Last Book Id")
            }
        );
    }

    addBook(form){

        console.log("Add New Book Contents ",form);
        let newId = (Number(this.lastBookId) + Number(1)).toString();
        let newBook = {
            id: newId,
            title: form.title,
            author: form.author,
            isbn: form.isbn,
            publicationDate: form.publicationDate,
            publisher: form.publisher,
            price: form.price,
            genre: form.genre,
            format: form.format
        };
        this.saveBooksubscription = this._bookStoreServices.saveBook(newBook).subscribe(
            (result) => {
                console.log("result ",result);
                this.route.navigate(['/books']);
            },
            (error) => {
                console.log("Error");
            }
        );
    }

    getBooks() {
        this.getBookssubscription = this._bookStoreServices.getBooks().subscribe((data ) => {
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
        this.getFormatssubscription = this._bookStoreServices.getFormats().subscribe((data) =>{
            this.bookFormats = data;
            console.log("Book Formats ",this.bookFormats);
        },
        (error) =>{
            console.log("Error while fetching Book Formats");
        }
        );
    }

    /* ngOnDestroy(){
        this.lastBooksubscription.unsubscribe();
        this.saveBooksubscription.unsubscribe();
        this.getBookssubscription.unsubscribe();
        this.getGenressubscription.unsubscribe();
        this.getFormatssubscription.unsubscribe();
    } */
}