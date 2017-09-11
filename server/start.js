'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const path = require('path')

//logging middleware
app.use(morgan('dev'))

//static middleware
app.use(express.static(path.join(__dirname, '../public')))

//parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
