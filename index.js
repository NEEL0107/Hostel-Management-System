const mysql = require("mysql");
const readline = require("readline");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_database",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

// Define the SQL query to create the table
function createTables() {
  const createMessTableQuery = `
        CREATE TABLE IF NOT EXISTS mess (
            mess_name VARCHAR(30),
            mess_no INT PRIMARY KEY,
            breakfast VARCHAR(30),
            lunch VARCHAR(30),
            dinner VARCHAR(30),
            fees INT
        )
    `;

  const createHostelTableQuery = `
        CREATE TABLE IF NOT EXISTS hostel (
            hostel_id INT PRIMARY KEY,
            hostel_name VARCHAR(30),
            floors INT,
            no_of_rooms INT,
            mess_no INT,
            FOREIGN KEY (mess_no) REFERENCES mess(mess_no)
        )
    `;

  const createRoomTableQuery = `
        CREATE TABLE IF NOT EXISTS room (
            room_no INT PRIMARY KEY,
            occupancy INT,
            avail VARCHAR(30),
            hostel_id INT,
            FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
        )
    `;

  const createAdminTableQuery = `
        CREATE TABLE IF NOT EXISTS admin (
            fac_id INT PRIMARY KEY,
            fac_name VARCHAR(20),
            contact_no NUMBER,
            hostel_id NUMBER,
            FOREIGN KEY (HOSTEL_ID) REFERENCES HOSTEL(HOSTEL_ID)
        )
    `;

  const createEnquiryTableQuery = `
        CREATE TABLE IF NOT EXISTS enquiry (
            complaint_no INT PRIMARY KEY,
            hostel_id INT,
            e_date DATE,
            status VARCHAR(20),
            FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id),
            FOREIGN KEY (fac_id) REFERENCES admin(fac_id)
        )
    `;

  const createStudentTableQuery = `
        CREATE TABLE IF NOT EXISTS student (
            stud_id INT PRIMARY KEY,
            name VARCHAR(30),
            year_of_study INT,
            contact INT,
            email VARCHAR(50),
            room_no INT,
            address VARCHAR(30),
            hostel_id INT,
            FOREIGN KEY (room_no) REFERENCES room(room_no),
            FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
        )
    `;

  const createPaymentTableQuery = `
        CREATE TABLE IF NOT EXISTS payment (
          trans_id INT PRIMARY KEY,
          mode_of_payment VARCHAR(20),
          hostel_id INT,
          stud_id INT,
          FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id),
          FOREIGN KEY (stud_id) REFERENCES student (stu_id)
        )
  `;
  const createVisitorTableQuery = `
        CREATE TABLE IF NOT EXISTS visitor (
            visitor_id INT PRIMARY KEY,
            visitor_name VARCHAR(50) NOT NULL,
            stud_id INT,
            visiting_date DATE,
            FOREIGN KEY (stud_id) REFERENCES student(stud_id)
        )
    `;

  const createStudentLogTableQuery = `
        CREATE TABLE IF NOT EXISTS student_log (
            stud_id INT,
            date_of_dep DATE,
            date_of_arr DATE,
            place VARCHAR(30),
            purpose_of_visit VARCHAR(30),
            PRIMARY KEY (stud_id, date_of_dep),
            FOREIGN KEY (stud_id) REFERENCES student(stud_id)
        )
    `;

  connection.query(createStudentTableQuery, (err) => {
    if (err) {
      console.error("Error creating Students table:", err);
    } else {
      console.log("Students table created successfully");
    }
  });

  connection.query(createMessTableQuery, (err) => {
    if (err) {
      console.error("Error creating Mess table:", err);
    } else {
      console.log("Mess table created successfully");
    }
  });

  connection.query(createHostelTableQuery, (err) => {
    if (err) {
      console.error("Error creating Hostel table:", err);
    } else {
      console.log("Hostel table created successfully");
    }
  });

  connection.query(createRoomTableQuery, (err) => {
    if (err) {
      console.error("Error creating Room table:", err);
    } else {
      console.log("Room table created successfully");
    }
  });

  connection.query(createAdminTableQuery, (err) => {
    if (err) {
      console.error("Error creating Admin table:", err);
    } else {
      console.log("Admin table created successfully");
    }
  });

  connection.query(createEnquiryTableQuery, (err) => {
    if (err) {
      console.error("Error creating Enquiry table:", err);
    } else {
      console.log("Enquiry table created successfully");
    }
  });

  connection.query(createStudentTableQuery, (err) => {
    if (err) {
      console.error("Error creating Student table:", err);
    } else {
      console.log("Student table created successfully");
    }
  });

  connection.query(createPaymentTableQuery, (err) => {
    if (err) {
      console.error("Error creating Student table:", err);
    } else {
      console.log("Payment table created successfully");
    }
  });

  connection.query(createVisitorTableQuery, (err) => {
    if (err) {
      console.error("Error creating Visitor table:", err);
    } else {
      console.log("Visitor table created successfully");
    }
  });

  connection.query(createStudentLogTableQuery, (err) => {
    if (err) {
      console.error("Error creating Student Log table:", err);
    } else {
      console.log("Student Log table created successfully");
    }
    // After tables are created, display the menu
    displayMenu();
    processInput();
  });
}

// Function to display main menu
function displayMenu() {
  console.log("\nMain Menu");
  console.log("1. Insert values into Mess table");
  console.log("2. Insert values into Hostel table");
  console.log("3. Insert values into Room table");
  console.log("4. Insert values into Student table");
  console.log("5. Insert values into Enquiry table");
  console.log("6. Insert values into Visitor table");
  console.log("7. Insert values into Student Log table");
  console.log("8. Insert values into Payment table");
  console.log("9. Insert values into Admin table");
  console.log("10. Update values into Student table");
  console.log("11. Display values of Student table");
  console.log("12. Delete Row from Student table");
  console.log("13. Display Data of Payment table");
  console.log("0. Exit");
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        insertMessValues();
        break;
      case "2":
        insertHostelValues();
        break;
      case "3":
        insertRoomValues();
        break;
      case "4":
        insertStudentValues();
        break;
      case "5":
        insertEnquiryValues();
        break;
      case "6":
        insertVisitorValues();
        break;
      case "7":
        insertStudentLogValues();
        break;
      case "8":
        insertPaymentValues();
        break;
      case "9":
        insertAdminValues();
        break;
      case "10":
        updateStudentValues();
        break;
      case "11":
        retrieveAllStudents();
        break;
      case "12":
        deleteStudentRow();
        break;
      case "13":
        retrievePaymentData();
        break;
      case "0":
        rl.close();
        connection.end(); 
        break;
      default:
        console.log("Invalid choice!");
        displayMenu();
        processInput();
        break;
    }
  });
}

function processInput() {
  rl.question("Enter your choice: ", (choice) => {
    handleInput(choice);
  });
}

// Function to insert values into the MESS table
function insertMessValues() {
  rl.question("Enter Mess Name: ", (messName) => {
    rl.question("Enter Mess Number: ", (messNo) => {
      rl.question("Enter Breakfast Timings: ", (breakfast) => {
        rl.question("Enter Lunch Timings: ", (lunch) => {
          rl.question("Enter Dinner Timings: ", (dinner) => {
            rl.question("Enter Fees: ", (fees) => {
              const insertQuery = `
                              INSERT INTO MESS (MESS_NAME, MESS_NO, BREAKFAST, LUNCH, DINNER, FEES) 
                              VALUES (?, ?, ?, ?, ?, ?)
                          `;
              connection.query(
                insertQuery,
                [
                  messName,
                  parseInt(messNo),
                  breakfast,
                  lunch,
                  dinner,
                  parseInt(fees),
                ],
                (err) => {
                  if (err) {
                    console.log("Error:", err.message);
                  } else {
                    console.log("Mess values inserted successfully!");
                  }
                  displayMenu();
                  processInput();
                }
              );
            });
          });
        });
      });
    });
  });
}

// Function to insert values into the HOSTEL table
function insertHostelValues() {
  rl.question("Enter Hostel ID: ", (hostelId) => {
    rl.question("Enter Hostel Name: ", (hostelName) => {
      rl.question("Enter Number of Floors: ", (numFloors) => {
        rl.question("Enter Capacity per Floor: ", (capacityPerFloor) => {
          rl.question("Enter Mess ID: ", (messId) => {
            const insertQuery = `
                          INSERT INTO HOSTEL (HOSTEL_ID, HOSTEL_NAME, FLOORS, no_of_rooms, mess_no) 
                          VALUES (?, ?, ?, ?, ?)
                      `;
            connection.query(
              insertQuery,
              [
                parseInt(hostelId),
                hostelName,
                parseInt(numFloors),
                parseInt(capacityPerFloor),
                parseInt(messId),
              ],
              (err) => {
                if (err) {
                  console.log("Error:", err.message);
                } else {
                  console.log("Hostel values inserted successfully!");
                }
                displayMenu();
                processInput();
              }
            );
          });
        });
      });
    });
  });
}

// Function to insert values into the ADMIN table
function insertAdminValues() {
  rl.question("Enter Admin ID: ", (adminId) => {
    rl.question("Enter Admin Name: ", (adminName) => {
      rl.question("Enter Admin Mobile No: ", (contact_no) => {
        rl.question("Enter Hostel Id: ", (hostel_id) => {
          const insertQuery = `
                  INSERT INTO ADMIN (faculty_id, fac_name, contact_no, hostel_id) 
                  VALUES (?, ?, ?, ?)
              `;
          connection.query(
            insertQuery,
            [
              parseInt(adminId),
              adminName,
              parseInt(contact_no),
              parseInt(hostel_id),
            ],
            (err) => {
              if (err) {
                console.log("Error:", err.message);
              } else {
                console.log("Admin values inserted successfully!");
              }
              displayMenu();
            }
          );
        });
      });
    });
  });
}

// Function to insert values into the ENQUIRY table
function insertEnquiryValues() {
  rl.question("Enter Enquiry ID: ", (complaint_no) => {
    rl.question("Enter Hostel ID: ", (hostelId) => {
      rl.question("Enter Date: ", (date) => {
        rl.question("Enter Status: ", (status) => {
          const insertQuery = `
                          INSERT INTO ENQUIRY (complaint_no, HOSTEL_ID, E_DATE, STATUS) 
                          VALUES (?, ?, ?, ?)
                      `;
          connection.query(
            insertQuery,
            [parseInt(complaint_no), parseInt(hostelId), date, status],
            (err) => {
              if (err) {
                console.log("Error:", err.message);
              } else {
                console.log("Enquiry values inserted successfully!");
              }
              displayMenu();
            }
          );
        });
      });
    });
  });
}
// Function to insert values into the STUDENT table
function insertStudentValues() {
  rl.question("Enter Student ID: ", (stud_id) => {
    rl.question("Enter Name: ", (name) => {
      rl.question("Enter Year of Study: ", (yearOfStudy) => {
        rl.question("Enter Contact Number: ", (contact) => {
          rl.question("Enter Email: ", (email) => {
            rl.question("Enter Room Number: ", (roomNo) => {
              rl.question("Enter Address: ", (address) => {
                rl.question("Enter Hostel ID: ", (hostelId) => {
                  const insertQuery = `
                                      INSERT INTO STUDENT (stud_id, NAME, YEAR_OF_STUDY, CONTACT, EMAIL, ROOM_NO, ADDRESS, HOSTEL_ID) 
                                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                  `;
                  connection.query(
                    insertQuery,
                    [
                      parseInt(stud_id),
                      name,
                      parseInt(yearOfStudy),
                      parseInt(contact),
                      email,
                      parseInt(roomNo),
                      address,
                      parseInt(hostelId),
                    ],
                    (err) => {
                      if (err) {
                        console.log("Error:", err.message);
                      } else {
                        console.log("Student values inserted successfully!");
                      }
                      displayMenu();
                    }
                  );
                });
              });
            });
          });
        });
      });
    });
  });
}

// Function to insert values into the VISITOR table
function insertVisitorValues() {
  rl.question("Enter Visitor ID: ", (visitorId) => {
    rl.question("Enter Visitor Name: ", (visitorName) => {
      rl.question("Enter Student ID: ", (studentId) => {
        rl.question("Enter Date: ", (date) => {
          const insertQuery = `
                          INSERT INTO VISITOR (VISITOR_ID, VISITOR_NAME, STUD_ID, VISITING_DATE) 
                          VALUES (?, ?, ?, ?)
                      `;
          connection.query(
            insertQuery,
            [parseInt(visitorId), visitorName, parseInt(studentId), date],
            (err) => {
              if (err) {
                console.log("Error:", err.message);
              } else {
                console.log("Visitor values inserted successfully!");
              }
              displayMenu();
            }
          );
        });
      });
    });
  });
}

// Function to insert values into the STUDENT_LOG table
function insertStudentLogValues() {
  rl.question("Enter Student ID: ", (studentId) => {
    rl.question("Enter DATE OF DEP: ", (entryTime) => {
      rl.question("Enter DATE OF ARRIVAL: ", (exitTime) => {
        rl.question("Enter PLACE: ", (place) => {
          rl.question("Enter Purpose to Visit: ", (purpose) => {
            const insertQuery = `
                      INSERT INTO STUDENT_LOG (STUD_ID, DATE_OF_DEP, DATE_OF_ARR, PLACE, PURPOSE_OF_VISIT) 
                      VALUES (?, ?, ?, ?, ?)
                  `;
            connection.query(
              insertQuery,
              [parseInt(studentId), entryTime, exitTime, place, purpose],
              (err) => {
                if (err) {
                  console.log("Error:", err.message);
                } else {
                  console.log("Student log values inserted successfully!");
                }
                displayMenu();
              }
            );
          });
        });
      });
    });
  });
}

// Function to insert values into the ROOM table
function insertRoomValues() {
  rl.question("Enter Room ID: ", (roomId) => {
    rl.question("Enter Room Capacity: ", (occupancy) => {
      rl.question("Available Room: ", (avail) => {
        rl.question("Enter Hostel Id: ", (hostel_id) => {
          const insertQuery = `
                      INSERT INTO ROOM (ROOM_NO, occupancy, avail, hostel_id ) 
                      VALUES (?, ?, ?, ?)
                  `;
          connection.query(
            insertQuery,
            [parseInt(roomId), parseInt(occupancy), avail, parseInt(hostel_id)],
            (err) => {
              if (err) {
                console.log("Error:", err.message);
              } else {
                console.log("Room values inserted successfully!");
              }
              displayMenu();
            }
          );
        });
      });
    });
  });
}

// Function to insert values into the PAYMENT table
function insertPaymentValues() {
  rl.question("Enter Payment ID: ", (paymentId) => {
    rl.question("Enter Payment Method: ", (paymentMethod) => {
      rl.question("Enter Hostel ID: ", (adminId) => {
        rl.question("Enter Student ID: ", (studentId) => {
          const insertQuery = `
                      INSERT INTO PAYMENT (TRANS_ID, MODE_OF_PAYMENT, HOSTEL_ID, STUD_ID) 
                      VALUES (?, ?, ?, ?)
                  `;
          connection.query(
            insertQuery,
            [
              parseInt(paymentId),
              paymentMethod,
              parseInt(adminId),
              parseInt(studentId),
            ],
            (err) => {
              if (err) {
                console.log("Error:", err.message);
              } else {
                console.log("Payment values inserted successfully!");
              }
              displayMenu();
            }
          );
        });
      });
    });
  });
}

function updateStudentValues() {
  rl.question("Enter Student ID to update: ", (stud_id) => {
    rl.question("Enter Name: ", (name) => {
      rl.question("Enter Year of Study: ", (yearOfStudy) => {
        rl.question("Enter Contact Number: ", (contact) => {
          rl.question("Enter Email: ", (email) => {
            rl.question("Enter Address: ", (address) => {
              const updateQuery = `
                    UPDATE STUDENT 
                    SET NAME = ?, YEAR_OF_STUDY = ?, CONTACT = ?, EMAIL = ?, ADDRESS = ?
                    WHERE stud_id = ?
                  `;
              connection.query(
                updateQuery,
                [
                  name,
                  parseInt(yearOfStudy),
                  parseInt(contact),
                  email,
                  address,
                  parseInt(stud_id),
                ],
                (err) => {
                  if (err) {
                    console.log("Error:", err.message);
                  } else {
                    console.log("Student values updated successfully!");
                  }
                  displayMenu();
                }
              );
            });
          });
        });
      });
    });
  });
}

function retrieveAllStudents() {
  const selectQuery = `
    SELECT * 
    FROM STUDENT
  `;
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log("All student data retrieved successfully:");
      console.table(results); // Display the results in a tabular format
    }
    displayMenu();
  });
}

function deleteStudentRow() {
  rl.question("Enter Student ID to delete: ", (stud_id) => {
    const deleteQuery = `
      DELETE FROM STUDENT
      WHERE stud_id = ?
    `;
    connection.query(deleteQuery, [parseInt(stud_id)], (err, result) => {
      if (err) {
        console.log("Error:", err.message);
      } else {
        if (result.affectedRows > 0) {
          console.log(`Student with ID ${stud_id} deleted successfully.`);
        } else {
          console.log(`Student with ID ${stud_id} not found.`);
        }
      }
      displayMenu();
    });
  });
}

function retrievePaymentData() {
  const selectQuery = `
    SELECT * FROM PAYMENT
  `;
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      if (results.length > 0) {
        console.log("Payment Data:");
        console.table(results);
      } else {
        console.log("No payment data found.");
      }
    }
    displayMenu();
  });
}

createTables();
