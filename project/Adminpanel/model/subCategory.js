
const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  subCategoryName: {
    type: String,
    required: true,
  },
});

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel;
