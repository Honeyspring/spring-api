const Book = require('../models/book');
exports.modifyBook = (req, res, next) => {
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    author:req.body.author,
    pages: req.body.pages,
    status:req.body.status,
    userId: req.body.userId,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  });
  book.updateOne({_id: req.params.id}, Book).then(
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

