const { Transaction } = require('../models/index');

const addTransaction = async (req, res) => {
  try {
    const trans = await Transaction.create({
      amount: req.body.amount,
      type: req.body.type,
    });
    await trans.setUser(req.user);
    return res.json({
      success: true,
      message: 'Transaction created successfully.',
      trans,
    });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};

const editBook = (req, res) => {
  return Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      return res.json(result);
    }
  );
};

const getTransactionByUser = async (req, res) => {
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 10;

  // const startindex = (page - 1) * limit;
  const user = req.user;
  const transList = await user.getTransactions();
  res.send(transList);
};

const getBookById = (req, res) => {
  Book.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.send(result);
  });
};

const deleteBook = (req, res) => {
  Book.findOneAndDelete(
    {
      _id: req.params.id,
    },
    (err, result) => {
      if (err) return res.json(err);
      if (result) {
        console.log(result);
        return res.json({ msg: 'Book deleted', success: true });
      }
      return res.json({ msg: 'Book not deleted', success: false });
    }
  );
};

module.exports = {
  addTransaction,
  editBook,
  getTransactionByUser,
  getBookById,
  deleteBook,
};
