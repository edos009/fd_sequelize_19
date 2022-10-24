const { before } = require("lodash");
const request = require("supertest");
const yup = require("yup");
const app = require("../app");
const db = require("../models");

const appRequest = request(app);

const getUserData = () => ({
  firstName: "TestName",
  lastName: "TestLastName",
  email: `test${Date.now()}@gmail.com`,
  password: "Test12345$",
  birthday: "1999-10-10",
  isMale: true,
});

const user = getUserData();

const schemaUserResponseSuccess = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date(),
  isMale: yup.boolean(),
});

const yupForDataSuccess = yup.array().of(schemaUserResponseSuccess);

const schemaSignUpDataSuccess = yup.object({
  data: yupForDataSuccess,
});

const schemaGetAllUsersSuccess = yup.object({
  data: yupForDataSuccess,
});

const schemaGetUserByIdSuccess = yup.object({
  data: schemaUserResponseSuccess,
});

const schemaSignUpValidationError = yup.object({
  errors: yup.array().of(yup.object({ message: yup.string() })),
});

beforeAll(() => {
  return db.sequelize.sync({ force: true });
});

afterAll(() => {
  return db.sequelize.close();
});

describe("Sign Up tests", () => {
  test("user must be created successfully 201", async () => {
    const response = await appRequest.post("/api/users/").send(user);
    expect(response.statusCode).toBe(201);
    expect(await schemaSignUpDataSuccess.isValid(response.body)).toBe(true);
  });
  test("user sign up with empty body to expect 400", async () => {
    const response = await appRequest.post("/api/users/").send({});
    expect(response.statusCode).toBe(400);
    expect(await schemaSignUpValidationError.isValid(response.body)).toBe(true);
  });
  test("user repeat sign up with not unique email to expect 409", async () => {
    const response = await appRequest.post("/api/users/").send(user);
    expect(response.statusCode).toBe(409);
    expect(await schemaSignUpDataSuccess.isValid(response.body)).toBe(true);
  });
});

describe("Get all users", () => {
  test("users must be received", async () => {
    const response = await appRequest.get("/api/users/");
    expect(response.statusCode).toBe(200);
    expect(await schemaGetAllUsersSuccess.isValid(response.body)).toBe(true);
  });
});

describe("Get user by id", () => {
  test("user must be received by id", async () => {
    const response = await appRequest.get("/api/users/1");
    expect(response.statusCode).toBe(200);
    expect(await schemaGetUserByIdSuccess.isValid(response.body)).toBe(true);
  });
  test("user not found to expect 404", async () => {
    const response = await appRequest.get("/api/users/10000");
    expect(response.statusCode).toBe(404);
  });
});
