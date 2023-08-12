const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    // 외부 데이터베이스에서 데이터를 받아올 때는 async / await 꼭 사용
    const craetedProduct = await productModel.create(req.body);
    console.log("craetedProduct", craetedProduct);
    // response statusCode를 201로 설정 후 빈 값 전송
    //   res.status(201).send();
    // response statusCode를 201로 설정 후 json으로 createdProduct 전송
    res.status(201).json(craetedProduct);
  } catch (error) {
    // 오류 발생 시 실행
    next(error);
  }
};
