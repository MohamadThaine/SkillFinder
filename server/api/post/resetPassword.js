const { User } = require('../../models/User');
const bcryptjs = require('bcryptjs');

const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        Email: email,
      },
    });

    if (!user) {
      res.send({ error: true });
    } else {
      res.send({ name: user.Name });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = bcryptjs.hashSync(password, 10);
  try {
    const result = await User.update(
      { Password: passwordHash },
      {
        where: {
          Email: email,
        },
      }
    );
    if (result[0] === 0) {
      res.send({ error: true });
    } else {
      res.send({ error: false });
    }
  } catch (error) {
    res.send({ error: true });
  }
};

module.exports = {
  checkEmail,
  resetPassword,
};
