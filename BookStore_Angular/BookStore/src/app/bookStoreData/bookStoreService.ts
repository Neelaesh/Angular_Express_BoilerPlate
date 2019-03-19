import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class BookStoreService{
    
    constructor(private http : HttpClient){
        
    }
    readonly endpoint = 'http://localhost:3000/books/';
    readonly httpOptions = {
        headers : new HttpHeaders({
            'Content-Type' : 'application/json'
        }),
    };

    private extractData(res : Response){
        let body = res;
        return body || {};
    }

    getBooks(): Observable<any>{
        return this.http.get(this.endpoint + 'fetchBooks' ).pipe(
            map(this.extractData));
    }

    getGenres(): Observable<any>{
       return this.http.get(this.endpoint + 'fetchGenres' ).pipe(
            map(this.extractData));
    }

    getFormats(): Observable<any>{
        return this.http.get(this.endpoint + 'fetchFormats' ).pipe(
            map(this.extractData));
    }

    getLastBook(){
        return this.http.get(this.endpoint + 'fetchLastBook' ).pipe(
            map(this.extractData));
    }

    saveBook(book): Observable<any> {
        console.log("Saving Book ",book);
        return this.http.post<any>(this.endpoint + 'saveBook', JSON.stringify(book), this.httpOptions).
        pipe(tap((book) => console.log(`Book Added ${book}`)),
        catchError(this.handleError<any>('addBook'))
        );
    }

    updateBook(book): Observable<any>{
        console.log("Update Book ",book);
        return this.http.post<any>(this.endpoint + 'updateBook', JSON.stringify(book), this.httpOptions).
        pipe(tap((book)=>console.log(`Book Updated ${book}`)),
        catchError(this.handleError('updateBook'))
        );
    }

    getBook(bookId): Observable<any>{
        console.log("View book ",bookId);
        return this.http.get(this.endpoint + 'viewBook/' + bookId).
        pipe(tap(book => console.log(`View Book ${book}`)),
        catchError(this.handleError('viewBook'))
        );
    }

    deleteBook(bookIds): Observable<any>{
        console.log("Delete Books ",bookIds);
        return this.http.post<any>(this.endpoint + 'deleteBook' ,JSON.stringify(bookIds), this.httpOptions).
        pipe(tap((book) => console.log(`Remaining Books ${book}`)),
        catchError(this.handleError('deleteBook'))
        );
    }

    private handleError<T> (operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            // Log Error
            console.log(error);
            console.log(`${operation} Failed ${error.message}`);
            // Return Result
            return of(result as T);
        };
    }   

}