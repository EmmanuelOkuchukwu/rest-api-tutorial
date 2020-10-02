const Staff = require('../model/staff.model');

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const staff = new Staff({
        firstname: req.body.firstname,
        surname: req.body.surname,
        home_address: req.body.home_address,
        email_address: req.body.email_address,
        storeId: req.body.storeId
    });

    Staff.create(staff, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Staff."
            })
        else res.send(data);
    });
};

exports.getAllStaffs = (req, res) => {
    Staff.getAllStaffs((err, data)=>{
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving staffs."
            });
        else res.send(data);
    });
};

exports.findStaffId = (req, res) => {
    Staff.findStaffId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Staff.updateByStaffId(
        req.params.userId,
        new Staff(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
};