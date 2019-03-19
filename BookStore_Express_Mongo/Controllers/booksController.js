var mongoClient = require('mongodb').MongoClient;
var config = require('../Configurations/config');

module.exports.getBooks = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            dbo.collection('books').find().toArray(function(error,results){
                if (error) throw error;
                client.close();
                //console.log("Books ",results);
                res.send(results);
            });
        }
    });
}

module.exports.getGenres = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            dbo.collection('genres').find().toArray(function(error,results){
                if (error) throw error;
                client.close();
                //console.log("Genres ",results);
                res.send(results);
            });
        }
    });
}   

module.exports.getFormats = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            dbo.collection('formats').find().toArray(function(error,results){
                if (error) throw error;
                client.close();
                //console.log("Formats ",results);
                res.send(results);
            });
        }
    });
} 

module.exports.getLastBook = (req,res) => {

    mongoClient.connect(config.mongourl,{ useNewUrlParser: true },function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            dbo.collection('books').find({}).sort({$natural:-1}).limit(1).toArray(function(error,results){
                if (error) throw error;
                client.close();
                //console.log("Last Book Array ",results);
                let resultObj = {...results};
                //console.log("Last Book Object ",resultObj['0']);
                res.send(resultObj['0']);
            });
        }
    });
} 

module.exports.saveBook = (req,res) => {

    mongoClient.connect(config.mongourl, { useNewUrlParser: true }, function(err,client){
        const dbo= client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            //console.log("Book to Insert ",req.body);
            dbo.collection('books').insertOne(req.body, { useNewUrlParser: true }, function(error, results){
            if (error) throw error;
            client.close();
            res.send(results.ops);
            });
        }
    });
}

module.exports.viewBook = (req,res) => {

    mongoClient.connect(config.mongourl, function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            //console.log("Book ID to be searched ",req.params.id);
            dbo.collection('books').findOne({ id: req.params.id}, { useNewUrlParser: true }, function(error,results){
                if (error) throw error;
                client.close();
                res.send(results);
            }); 
        }
    });
}

module.exports.updateBook = (req,res) => {

    mongoClient.connect(config.mongourl, { useNewUrlParser: true }, function(err, client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            //console.log("Book ID to be updated ",req.body.id);
            dbo.collection('books').findOneAndUpdate(
                { id: req.body.id },
                {
                    $set: { 
                        title: req.body.title,
                        author: req.body.author,
                        isbn: req.body.isbn,
                        publicationDate: req.body.publicationDate,
                        publisher: req.body.publisher,
                        price: req.body.price,
                        genre: req.body.genre,
                        format: req.body.format
                    }
                },
                {
                    upsert: true
                },
                function(error, results){
                    if (error) throw error;
                    client.close();
                    res.send(results);
                }
            );
        }   
    });
}

module.exports.deleteBook = (req,res) => {

    mongoClient.connect(config.mongourl, function(err,client){
        const dbo = client.db(config.dbname);
        if(err){
            console.log("Error Occurred while connecting ",err);
            res.send(err);
        }
        else{
            console.log("Book IDs to be deleted ",req.body);
            dbo.collection("books").deleteMany({ id : { $in : req.body } }, function(error, results) {
                if (error) throw error;
                client.close();
                res.send(results);
            });
        }
    });
}