var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var logger = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');

var app=new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',function(req,res){
    res.send('Server Side');
});

app.get('/getBooks',function(req,res,next){
    fs.readFile('./bookStoreData/books.json',function(err,data){
        if(err)
            throw err;
        let books = JSON.parse(data);
        res.send(books);
    });
});

app.get('/getGenres',function(req,res){
    fs.readFile('./bookStoreData/genres.json',function(err,data){
        if(err)
            throw err;
        let genres = JSON.parse(data);
        res.send(genres);
    });
});

app.get('/getFormats',function(req,res){
    fs.readFile('./bookStoreData/formats.json',function(err,data){
        if(err)
            throw err;
        let formats = JSON.parse(data);
        res.send(formats);
    });
});

app.post('/saveBook',function(req,res){
    fs.readFile('./bookStoreData/books.json', 'utf8', function(err,data){
        if(err)
            throw err;
        let books = JSON.parse(data);
        let booksCount = books.length;
        //console.log("Books Count",booksCount);
        let bookId = books[booksCount-1].id;
        //console.log("Last Book Id ",bookId);
        let newbookId = Number(bookId) + 1;
        //console.log("New Book Id ",newbookId);
        let book = {
            "id"  : newbookId.toString(),
            "title" : req.body.title,
            "author" : req.body.author,
            "isbn" : req.body.isbn,
            "publicationDate" : req.body.publicationDate,
            "publisher" : req.body.publisher,
            "price" : req.body.price,
            "genre" : req.body.genre,
            "format" : req.body.format
        };
        books.push(book);
        //console.log(books);
        fs.writeFile('./bookStoreData/books.json', JSON.stringify(books), 'utf8' , function(err){
            res.send(books);
        });
    });
});

app.post('/updateBook',function(req,res){
    fs.readFile('./bookStoreData/books.json','utf8',function(err,data){
        if(err)
            throw err;
        let books = JSON.parse(data);
        let bookId = req.body.id;
        //console.log("BookId to be updated ",bookId);
        for(let i=0;i<books.length;i++){
            if(bookId == books[i].id){
                books[i].title= req.body.title;
                books[i].author = req.body.author;
                books[i].isbn = req.body.isbn;
                books[i].publicationDate = req.body.publicationDate;
                books[i].publisher = req.body.publisher;
                books[i].price = req.body.price;
                books[i].genre = req.body.genre;
                books[i].format = req.body.format;
            }
        }
        fs.writeFile('./bookStoreData/books.json', JSON.stringify(books), 'utf8', function(err){
            res.send(books);
        });
    });
});

app.get('/getBook/:id',function(req,res){
    fs.readFile('./bookStoreData/books.json', 'utf8', function(err,data){
        if(err)
            throw err;
        let bookId = req.params.id;
        //console.log(bookId);
        let books = JSON.parse(data);
        let bookDetails = {};
        for(let i=0;i<books.length;i++){
            if(bookId == books[i].id){
                bookDetails.title = books[i].title;
                bookDetails.author = books[i].author;
                bookDetails.isbn = books[i].isbn; 
                bookDetails.publicationDate = books[i].publicationDate;
                bookDetails.publisher = books[i].publisher;
                bookDetails.price = books[i].price;
                bookDetails.genre = books[i].genre;
                bookDetails.format = books[i].format;
            }
        }
        res.send(bookDetails);
    });
});

app.post('/deleteBook',function(req,res){
    fs.readFile('./bookStoreData/books.json', 'utf8', function(err,data){
        if(err)
            throw err;
        let bookIds = req.body;
        let books = JSON.parse(data);
        bookIds.map(id=>{
            books.map((book,index)=>{
                if(id===book.id){
                    books.splice(index,1)
                }
            })
        })
        //console.log("Remaining Books ",books);
        fs.writeFile('./bookStoreData/books.json', JSON.stringify(books), 'utf8', function(err){
            res.send(books);
        });
    });
});

app.listen(3000);
console.log("Express JS listening on port 3000");