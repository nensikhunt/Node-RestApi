const Api = require('../models/api.model.js');

exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "aopi content can not be empty"
        });
    }

    const api = new Api({
        title: req.body.title || "Untitled Api",
        content: req.body.content,
    });

    api.save()
        .then(data => {
            res.send({
                message: "Api added sucessfully",
                status: 200,
                data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the api."
            });
        });
};

exports.findAll = (req, res) => {
    Api.find()
        .then(apis => {
            res.send(apis);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving apis."
            });
        });
};

exports.findOne = (req, res) => {
    Api.findById(req.params.ApiId)
        .then(Api => {
            if (!Api) {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId
                });
            }
            res.send(Api);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Api with id " + req.params.ApiId
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Api content can not be empty"
        });
    }

    Api.findByIdAndUpdate(req.params.ApiId, {
        title: req.body.title || "Untitled Api",
        content: req.body.content,
    }, { new: true })
        .then(Api => {
            if (!Api) {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId,
                    status: 404
                });
            }
            res.send({
                message: "Api update sucessfully " + req.params.ApiId,
                status: 200
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId,
                    status: 404
                });
            }
            return res.status(500).send({
                message: "Error updating Api with id " + req.params.ApiId,
                status: 500
            });
        });
};

exports.delete = (req, res) => {
    Api.findByIdAndDelete({ _id: req.params.ApiId })
        .then(Api => {
            if (!Api) {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId,
                    status: 404
                });
            }
            res.send({ message: "Api deleted successfully!",status: 200 });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Api not found with id " + req.params.ApiId,
                    status: 404
                });
            }
            return res.status(500).send({
                message: "Could not delete Api with id " + req.params.ApiId,
                status: 500
            });
        });
};