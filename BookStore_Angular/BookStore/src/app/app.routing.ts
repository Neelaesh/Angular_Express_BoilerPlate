import { Routes, RouterModule } from '@angular/router';

import { AboutBookComponent } from './bookStore/aboutBookComponent';
import { ViewBooksComponent } from './bookStoreOperations/viewBooksComponent';
import { ViewBookComponent } from './bookStoreOperations/viewBookComponent';
import { AddBookComponent } from './bookStoreOperations/addBookComponent';
import { UpdateBookComponent } from './bookStoreOperations/updateBookComponent';
import { BooksCustomViewComponent } from './bookStoreOperations/booksCustomViewComponent';


const appRoute : Routes = [
    { path: 'about',component: AboutBookComponent},
    { path: 'books',component: ViewBooksComponent},
    { path: 'books/:id',component: ViewBookComponent},
    { path: 'addBook',component: AddBookComponent},
    { path: 'updateBook/:id',component: UpdateBookComponent},
    { path: 'customView',component: BooksCustomViewComponent}
];

export const routing = RouterModule.forRoot(appRoute);