const { User } = require('../../models/User');

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
  try {
    const result = await User.update(
      { Password: password },
      {
        where: {
          Email: email,
        },
      }
    );
   console.log(email, password)
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
