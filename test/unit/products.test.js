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
  next = jest.fn();
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

  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    // productModel.create가 호출되는지 확인
    // expect(productModel.create).toBeCalled();
    // productModel.create 호출 시 newProduct가 인자값에 들어가 있는지 확인
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    // res.status(201).send()에서 true가 발생했는지 확인
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    // mock function에 리턴값 지정
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    // res의 데이터가 json 형식의 newProduct인지 확인
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    // 에러 메세지 작성
    const errorMessage = { message: "description property missing" };
    // 에러 메세지 설정
    const rejectedPromise = Promise.reject(errorMessage);
    // 가짜 함수의 리턴값을 설정된 에러 메세지로 지정
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    // next의 인자값으로 reject message가 들어가 호출되는지 확인
    expect(next).toBeCalledWith(errorMessage);
  });
});
