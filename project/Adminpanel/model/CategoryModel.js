const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category:{type: 'string',required: true}
});

const CategoryModel = mongoose.Model("category", categorySchema);

module.exports = CategoryModel;