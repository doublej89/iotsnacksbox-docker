"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const User_1 = require("../models/User");
const error_handler_1 = __importDefault(require("../config/error-handler"));
const config_1 = __importDefault(require("../config"));
class UserService {
  create(user) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const newuser = new User_1.User(Object.assign({}, user));
        if (yield newuser.save()) {
          return newuser;
        }
      } catch (error) {
        throw new Error("can't create user.");
      }
    });
  }
  login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = yield User_1.User.findOne({ email });
      if (!user) {
        throw new error_handler_1.default(
          422,
          "Username or Password is incorrect"
        );
      }
      if (!user.comparePassword(password)) {
        throw new error_handler_1.default(
          422,
          "Username or Password is incorrect"
        );
      }
      return user;
    });
  }
  authenticateWithFacebook(token) {
    return __awaiter(this, void 0, void 0, function* () {
      const fbAPIUrl = `${
        config_1.default.facebook.apiUrl
      }${config_1.default.facebook.userDatafields.toString()}&access_token=${token}`;
      const response = yield node_fetch_1.default(fbAPIUrl, { method: "get" });
      const userData = yield response.json();
      const userObj = {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        avatar: userData.picture.data.url,
        facebook: {
          id: userData.id,
          email: userData.email,
          picture: userData.picture.data.url,
        },
      };
      const user = yield User_1.User.findOne({ email: userObj.email });
      if (!user) {
        const newUser = yield User_1.User.create(userObj);
        return newUser;
      }
      if (user.facebook.id != userData.id) {
        user.facebook = userObj.facebook;
        yield user.save();
      }
      return user;
    });
  }
  authenticateWithGithub(token) {
    return __awaiter(this, void 0, void 0, function* () {
      const ghAPIUrl = `${config_1.default.github.apiUrl}user`;
      const response = yield node_fetch_1.default(ghAPIUrl, {
        method: "get",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.machine-man-preview+json",
        },
      });
      const userData = yield response.json();
      const userObj = {
        firstName: userData.name,
        lastName: "",
        email: userData.email,
        avatar: userData.avatar_url,
        github: userData,
      };
      const user = yield User_1.User.findOne({ email: userObj.email });
      if (!user) {
        const newUser = yield User_1.User.create(userObj);
        return newUser;
      }
      if (user.github.id != userData.id) {
        user.github = userObj.github;
        yield user.save();
      }
      return user;
    });
  }
  authenticateWithGoogle(token) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = config_1.default.google.apiUrl;
      const response = yield node_fetch_1.default(url, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = yield response.json();
      console.log("Returned google email after oauth: " + userData.email);
      const userObj = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
      };
      const user = yield User_1.User.findOne({ email: userObj.email });
      if (!user) {
        const newUser = yield User_1.User.create(userObj);
        return newUser;
      }
      return user;
    });
  }
  getProfile(email) {
    return __awaiter(this, void 0, void 0, function* () {
      const profile = yield User_1.User.findOne({ email });
      if (!profile) {
        throw new Error("User Not Found");
      }
      return profile;
    });
  }
  updateProfile(user) {
    return __awaiter(this, void 0, void 0, function* () {
      const profile = yield User_1.User.findById(user._id);
      delete user._id, user.emailVarifyAt, user.password;
      yield profile.updateOne(user);
      return profile;
    });
  }
  // TODO: We have to implement Twitter auth
  authenticateWithTwitter(token) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = config_1.default.twitter.apiUrl;
      const response = yield node_fetch_1.default(url, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = yield response.json();
      const userObj = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
      };
      const user = yield User_1.User.findOne({ email: userObj.email });
      if (!user) {
        const newUser = yield User_1.User.create(userObj);
        return newUser;
      }
      return user;
    });
  }
  getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield User_1.User.findOne({ _id: id });
    });
  }
  getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield User_1.User.findOne({ email });
    });
  }
}
exports.default = new UserService();
//# sourceMappingURL=user.js.map
