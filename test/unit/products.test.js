const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  // mock request, response 생성
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});
describe("Product Controller Create", () => {
  beforeEach(() => {
    // 임의의 가짜 데이터를 req.body에 주입
    // productModel.create시 mongoose.schema에 해당하는 req.body가 필요
    req.body = newProduct;
  });
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("should call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    // productModel.create가 호출되는지 확인
    // expect(productModel.create).toBeCalled();
    // productModel.create 호출 시 newProduct가 인자값에 들어가 있는지 확인
    expect(productModel.create).toBeCalledWith(newProduct);
  });
});
