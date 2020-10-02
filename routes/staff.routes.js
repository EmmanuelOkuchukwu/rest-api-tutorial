module.exports = app => {
    const staffs = require("../controller/staff.controller");

    app.post('/staffs', staffs.create);

    app.get('/staffs', staffs.findStaffId);

    app.get('staffs/:userId', staffs.findStaffId);

    app.put('/staffs/:userId', staffs.update);

};