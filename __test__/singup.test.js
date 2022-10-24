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

const schemaSignUpDataSuccess = yup.object({
  data: yup.array().of(schemaUserResponseSuccess),
});

afterAll(() => {
  return db.sequelize.close();
});

describe("Sign Up tests", () => {
  test("user must be created successfully", async () => {
    const response = await appRequest.post("/api/users/").send(user);
    expect(response.statusCode).toBe(201);
    expect( await schemaSignUpDataSuccess.isValid(response.body)).toBe(true);
  });
});
