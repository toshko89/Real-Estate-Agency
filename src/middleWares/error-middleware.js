const express = require('express');

exports.errorHandler = function (error, req, res, next) {
    if (error) {
        res.locals.errors = error;
        return res.status(404).render('main', error);
    }

    next();
}