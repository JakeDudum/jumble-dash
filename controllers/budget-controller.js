var db = require("../models");

module.exports = {
    findOne: function (req, res) {
        db.Budget.findOne({
            where: {
                ProjectId: req.params.id
            }
        }).then(function (dbBudget) {
            res.json(dbBudget);
        });
    },
    create: function (req, res) {
        db.Budget.create({
            total: parseInt(req.body.Marketing) + parseInt(req.body.HR) + parseInt(req.body.Design) + parseInt(req.body.Engineering) + parseInt(req.body.Sales) +
                parseInt(req.body.Finance) + parseInt(req.body.Security),
            Marketing: req.body.Marketing,
            HR: req.body.HR,
            Design: req.body.Design,
            Engineering: req.body.Engineering,
            Sales: req.body.Sales,
            Finance: req.body.Finance,
            Security: req.body.Security,
            ProjectId: req.body.ProjectId
        }).then(function (newBudget) {
            res.json(newBudget)
        })
    },
    update: function (req, res) {
        db.Budget.update({
            total: req.body.total,
            Marketing: req.body.Marketing,
            HR: req.body.HR,
            Design: req.body.Design,
            Engineering: req.body.Engineering,
            Sales: req.body.Sales,
            Finance: req.body.Finance,
            Security: req.body.Security,
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        }).then(function (dbBudget) {
            res.json(dbBudget);
        });
    }
};