const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    // 외부 데이터베이스에서 데이터를 받아올 때는 async / await 꼭 사용
    const craetedProduct = await productModel.create(req.body);
    // response statusCode를 201로 설정 후 빈 값 전송
    //   res.status(201).send();
    // response statusCode를 201로 설정 후 json으로 createdProduct 전송
    res.status(201).json(craetedProduct);
  } catch (error) {
    // 오류 발생 시 실행
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let deletedProduct = await productModel.findByIdAndDelete(
      req.params.productId
    );
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
