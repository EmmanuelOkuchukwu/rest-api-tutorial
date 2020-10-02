const sql = require('./db.js');

const Staff = function(staff) {
    this.firstname = staff.firstname;
    this.surname = staff.surname;
    this.home_address = staff.home_address;
    this.email_address = staff.email_address;
    this.storeId = staff.storeId;
}

Staff.create = (newStaff, result) => {
    sql.query("INSERT INTO staffs SET ?", newStaff, (err, res) => {
        if(err) {
            console.log('Error', err);
            result(err, null);
            return;
        }
        console.log('created staff: ', { id: res.insertId, ...newStaff });
        result(null, { id: res.insertId, ...newStaff });
    });
};

Staff.findStaffId = (userId, result) => {
    sql.query(`SELECT * FROM staffs WHERE staffId = ${userId}`, userId, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log('found staff', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found" }, null);
    });
};

Staff.getAllStaffs = (userId, result) => {
    sql.query("Select * FROM staffs", (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        console.log("staffs: ", res);
        result(null, res);
    });
};

Staff.updateByStaffId = (userId, staff, result) => {
    sql.query("UPDATE staffs SET firstname = ?, surname = ?, home_address = ?, email_address = ?, storeId = ? WHERE userId = ?", [staff.firstname, staff.surname, staff.home_address, staff.email_address, staff.storeId, userId], (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated staff: ", {userId: userId, ...staff});
        result(null, { userId: userId, ...staff });
    });
};

module.exports = Staff;