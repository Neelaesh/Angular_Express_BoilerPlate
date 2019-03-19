export class BooksCustomViewLocalStore{

    bookView : any={
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

    load(){
        this.saveView(this.bookView);
    }

    /**
     * Method to Save View
     */
    saveView(bookView){
        localStorage.setItem('customView',JSON.stringify(bookView));
    }

    /**
     * Method to Fetch Views
     */
    getView(){
        return JSON.parse(localStorage.getItem('customView'));
    }
}