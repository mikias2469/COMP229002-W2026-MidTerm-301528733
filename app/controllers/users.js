let UsersModel = require("../models/users");

// GET /api/users  (list)
module.exports.usersList = async function (req, res, next) {
  try {
    const list = await UsersModel.find();

    // if you want: allow empty list (no error)
    res.json({
      success: true,
      message: "User list retrieved successfully.",
      data: list,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET /api/users/:id  (one user)
module.exports.getByID = async function (req, res, next) {
  try {
    let user = await UsersModel.findOne({ _id: req.params.id });

    if (!user) throw new Error("User not found. Are you sure it exists?");

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// POST /api/users  (create)
module.exports.processAdd = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    const result = await UsersModel.create(newUser);

    res.status(200).json({
      success: true,
      message: "User added successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// PUT /api/users/:id  (update)
module.exports.processEdit = async (req, res, next) => {
  try {
    let id = req.params.id;

    let updatedUser = UsersModel(req.body);
    updatedUser._id = id;

    let result = await UsersModel.updateOne({ _id: id }, updatedUser);
    console.log("====> Result: ", result);

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "User updated successfully.",
      });
    } else {
      throw new Error("User not updated. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE /api/users/:id  (delete)
module.exports.performDelete = async (req, res, next) => {
  try {
    let id = req.params.id;

    let result = await UsersModel.deleteOne({ _id: id });
    console.log("====> Result: ", result);

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};