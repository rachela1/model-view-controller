const router = require('express').Router();

const express = require('express');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;