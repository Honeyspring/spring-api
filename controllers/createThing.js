const Book = require('../models/book');

exports.createThing = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author:req.body.author,
    pages: req.body.pages,
    status:req.body.status,
    userId: req.body.userId,
     imageUrl: req.body.imageUrl,
     description: req.body.description,
  });
 book.save().then(
    () => {
      res.status(201).json({
        message: 'Book  successfully saved!'
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