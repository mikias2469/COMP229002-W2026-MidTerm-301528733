let BookModel = require('../models/books');


// GET ONE BOOK BY ID
module.exports.getBook = async function (req, res, next) {
  try {
    const id = req.params.id || req.params.bookId;

    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
        data: null
      });
    }

    // convert _id to id
    const obj = book.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    res.json({
      success: true,
      message: "Book retrieved successfully.",
      data: obj
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};



// CREATE BOOK
module.exports.create = async function (req, res, next) {
  try {
    let book = req.body;

    let result = await BookModel.create(book);

    const obj = result.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    res.status(200).json({
      success: true,
      message: "Book created successfully.",
      data: obj
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};



// GET ALL BOOKS
module.exports.getAll = async function (req, res, next) {
  try {

    let list = await BookModel.find().sort({ _id: -1 });

    const data = list.map(book => {
      const obj = book.toObject();
      obj.id = obj._id.toString();
      delete obj._id;
      delete obj.__v;
      return obj;
    });

    res.json({
      success: true,
      message: "Book list retrieved successfully.",
      data: data
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};



// UPDATE BOOK
module.exports.update = async function (req, res, next) {
  try {

    const id = req.params.id || req.params.bookId;

    const result = await BookModel.updateOne(
      { _id: id },
      { $set: req.body }
    );

    if (result.modifiedCount > 0 || result.matchedCount > 0) {

      res.status(200).json({
        success: true,
        message: "Book updated successfully."
      });

    } else {
      throw new Error("Book not updated. Are you sure it exists?");
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
};



// DELETE BOOK
module.exports.remove = async function (req, res, next) {
  try {

    const id = req.params.id || req.params.bookId;

    const result = await BookModel.deleteOne({ _id: id });

    if (result.deletedCount > 0) {

      res.status(200).json({
        success: true,
        message: "Book deleted successfully."
      });

    } else {
      throw new Error("Book not deleted. Are you sure it exists?");
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
};