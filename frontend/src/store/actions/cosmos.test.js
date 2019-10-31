import axios from "axios";
import * as cosmos from "./cosmos";
import store from "../store";

const stubLoggedInUser1 = {
  id: 1,
  email: "e1",
  password: "p1",
  name: "n1",
  logged_in: true
};
const stubLoggedOutUser1 = {
  id: 1,
  email: "e1",
  password: "p1",
  name: "n1",
  logged_in: false
};
const stubLoggedInUser2 = {
  id: 2,
  email: "e2",
  password: "p2",
  name: "n2",
  logged_in: true
};
const stubLoggedOutUser2 = {
  id: 2,
  email: "e2",
  password: "p2",
  name: "n2",
  logged_in: false
};

describe("cosmos.js", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users with getUsers", done => {
    const stubUserList = [stubLoggedOutUser1, stubLoggedOutUser2];
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUserList
        };
        resolve(result);
      });
    });
    store.dispatch(cosmos.getUsers()).then(() => {
      const newState = store.getState();
      expect(newState.td.Users).toBe(stubUserList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it("should fetch user with getUser", done => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLoggedInUser1
        };
        resolve(result);
      });
    });
    store.dispatch(cosmos.getUser()).then(() => {
      const newState = store.getState();
      expect(newState.td.selectedUser).toBe(stubLoggedInUser1);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'putUser' should change User correctly`, (done) => {
    const stubUserList = [stubLoggedOutUser1, stubLoggedOutUser2];

    const spy = jest.spyOn(axios, 'patch')
      .mockImplementation((url, td) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data : stubLoggedOutUser1
          };
          resolve(result);
        });
      })

    store.dispatch(cosmos.putUser(stubLoggedOutUser1)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    });
  });

});
