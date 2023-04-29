const db = require('../../dbConnection');

const getApprenticeshipInfo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const apprenticeshipResult = await new Promise((resolve, reject) => {
        db.query(
          'SELECT * FROM apprenticeship WHERE ID = ?',
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
  
      const [address, category, author, authorPic, enrolledStudents] = await Promise.all([
        apprenticeshipResult.Address_ID !== null ? getAddress(apprenticeshipResult.Address_ID) : null,
        getCategory(apprenticeshipResult.Category_ID),
        getAuthor(apprenticeshipResult.Owner_ID),
        getAuthorPic(apprenticeshipResult.User_ID),
        getEntrolledStudent(apprenticeshipResult.ID)
      ]);
  
      const data = {
        apprenticeship: apprenticeshipResult,
        address,
        category,
        author,
        authorPic,
        enrolledStudents
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
            console.log(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  }
    
  const getAuthorPic = (ID) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT picture FROM apprenticeship_owner WHERE User_ID = ?',
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
    

  const getEntrolledStudent = (ID) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS enrolledStudentsCount FROM apprenticeship_apprentice WHERE Apprenticeship_ID = ?',
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

  const getAddress = (ID) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM apprenticeship_address WHERE ID = ?',
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