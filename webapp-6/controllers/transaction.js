const { Transaction, User } = require('../models/index');

const addTransaction = async (req, res) => {
  try {
    const { amount, type, party_username } = req.body;

    const findParty = await User.findOne({
      where: { username: party_username },
    });
    let trans = null;
    if (findParty) {
      trans = await Transaction.create({
        amount,
        type,
        partyId: findParty.id,
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: 'No party with the given username exists. Try Again.',
      });
    }

    await trans.setUser(req.user);
    return res.json({
      success: true,
      message: 'Transaction created successfully.',
      transaction: trans,
    });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};

const editTransactionById = async (req, res) => {
  try {
    const trans = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!trans) throw new Error('No such Transaction Found.');

    trans.amount = req.body.amount;

    await trans.save();

    return res.send({
      success: true,
      transaction: trans,
    });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
};

const getTransactionByUser = async (req, res) => {
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 10;

  // const startindex = (page - 1) * limit;
  const user = req.user;
  let transList = await user.getTransactions();
  let modifiedList = await transList.map(async (trans) => {
    const party = await User.findOne({ where: { id: trans.partyId } });
    // console.log(party);
    return { party, ...trans.dataValues };
  });
  return Promise.all(modifiedList).then((values) => {
    return res.send({ success: true, transactions: values });
  });
};

const getTransactionById = async (req, res) => {
  try {
    const trans = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!trans) throw new Error('No such Transaction Found.');
    return res.send({
      success: true,
      transaction: trans,
    });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const trans = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
    });
    await trans.destroy();
    res.send({ success: true, message: 'Transaction Deleted Successfully.' });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
};

module.exports = {
  addTransaction,
  editTransactionById,
  getTransactionByUser,
  getTransactionById,
  deleteTransactionById,
};
