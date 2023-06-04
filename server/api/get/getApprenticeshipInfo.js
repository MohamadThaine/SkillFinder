const db = require('../../dbConnection');

const getApprenticeshipInfo = async (req, res) => {
  const { id, userID } = req.params;
  try {
    const apprenticeshipResult = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM apprenticeship WHERE ID = ? AND Deactivated = 0',
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    const [address, category, author, authorPic, enrolledStudents, student] = await Promise.all([
      apprenticeshipResult.Address_ID !== null ? getAddress(apprenticeshipResult.Address_ID) : null,
      getCategory(apprenticeshipResult.Category_ID),
      getAuthor(apprenticeshipResult.Owner_ID),
      getAuthorPic(req, apprenticeshipResult.Owner_ID),
      getEntrolledStudentCount(apprenticeshipResult.ID),
      userID !== 'guest' ? getStudent(apprenticeshipResult.ID, userID) : null
    ]);

    const data = {
      apprenticeship: apprenticeshipResult,
      address,
      category,
      author,
      authorPic,
      enrolledStudents,
      student
    };
    res.send(data);
  } catch (err) {
    res.send({ error: err });

  }
};

const getCategory = (ID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM category WHERE ID = ?',
      [ID],
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};

const getAuthor = (ID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM user WHERE ID = ?',
      [ID],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          delete result[0].Password;
          resolve(result[0]);
        }
      }
    );
  });
}

const getAuthorPic = (req, ID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT Picture FROM apprenticeship_owner WHERE User_ID = ?',
      [ID],
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          picturePath = `${req.protocol}://${req.get('host')}/${result[0].Picture}`;
          resolve(picturePath);
        }
      }
    );
  });
}



const getEntrolledStudentCount = (ID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT COUNT(*) AS enrolledStudentsCount FROM apprenticeship_apprentice WHERE Apprenticeship_ID = ? AND isApproved = 1',
      [ID],
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}

const getStudent = (appID, studentID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT Apperntice_ID, isApproved FROM skillfinder.apprenticeship_apprentice WHERE Apprenticeship_ID = ? AND Apperntice_ID = ?',
      [appID, studentID],
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}

const getAddress = (ID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM address WHERE ID = ?',
      [ID],
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}


module.exports = getApprenticeshipInfo;