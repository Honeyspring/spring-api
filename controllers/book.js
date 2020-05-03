const Book= require('../models/book'); //connect table schema
const fs = require('fs');
/*to add a file to the request, the front end needed to send the request data as form-data as opposed to JSON — 
the request body contains a  Book string, 
which is simply a stringified  Book object — 
we therefore need to parse it using  JSON.parse()  to get a usable object*/
/*we also need to resolve the full URL for our image, as  req.file.filename  only contains the filename segment — 
we use  req.protocol  to get the first segment ( 'http' , in this case); we add the  '://' , and then use  req.get('host')  to resolve the 
server host ('localhost:3000'  in this case); we finally add  '/images/'  and the filename to complete our URL*/
exports.createBook= (req, res, next) => {
  req.body.book = JSON.parse(req.body.book);
  const url = req.protocol + '://' + req.get('host');
  const book = new Book({
    title: req.body.book.title,
    author:req.body.book.author,
    pages: req.body.book.pages,
    status:req.body.book.status,
    userId: req.body.book.userId,
   imageUrl: url + '/images/' + req.file.filename,
     description: req.body.description
   
  });
  book.save().then(
    () => {
      res.status(201).json({
        message: 'Book saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    } 
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
/*we first create a new instance of our  Book  model with the received  _id 
 so as not to cause problems when trying to update that  Book  in the database

if we receive a new file with the request (via  multer  ), we handle the form-data and generate the image URL

if we do not receive a new file, we simply capture the request body JSON

we save the updated  Book  to the database*/
exports.modifyBook = (req, res, next) => {
  let book = new Book({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.book = JSON.parse(req.body.book);
    book = {
    _id: req.params.id,
    title: req.body.book.title,
    author:req.body.book.author,
    pages: req.body.book.pages,
    status:req.body.book.status,
    userId: req.body.book.userId,
    imageUrl: url + '/images/' + req.file.filename,
     description: req.body.description
   
  };
  } else {
    book = {
     _id: req.params.id,
    title: req.body.title,
    author:req.body.author,
    pages: req.body.pages,
    status:req.body.status,
    userId: req.body.userId,
     imageUrl: req.body.imageUrl,
     description: req.body.description,
  };
  }
  Book.updateOne({_id: req.params.id}, Book).then(
    () => {
      res.status(201).json({
        message: 'Book updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*we use the ID we receive as a parameter to access the corresponding  book  in the database;

we use the fact that we know there is an  /images/  segment in our image URL to separate out the file name;

we then use the  fs  package's  unlink  function to delete that file, passing it the file to be deleted and the callback to be executed once that file has been deleted;

in the callback, we implement the original logic, deleting the  book  from the database.*/
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id}).then(
    (book) => {
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Book.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id}).then(
    (book) => {
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Book.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllBook = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};