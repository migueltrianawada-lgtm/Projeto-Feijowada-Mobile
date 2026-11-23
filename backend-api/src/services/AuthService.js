const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {

  async hashPassword(password) {

    return bcrypt.hash(
      password,
      10
    );

  }

  async comparePassword(
    password,
    hash
  ) {

    return bcrypt.compare(
      password,
      hash
    );

  }

  generateToken(user) {

    return jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

  }

}

module.exports =
new AuthService();