/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
dotenv.config();
//MONGOOSE DB
import mongoose from 'mongoose';
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

import adminDashboardRoutes from './src/routes/transfert.js';
import adminUserManagmentRoutes from './src/routes/user.js';
import adminAgentManagmentRoutes from './src/routes/agent.js';
import path from 'path';
import mediumAdminRoutes from './src/routes/moneyTaker.js';

import agentsRoutes from './src/routes/userAgent.js';

import moneyGiverRoutes from './src/routes/moneyGiver.js';

import sharedRoutes from './src/routes/shared.js';

import authRoutes from './src/routes/auth.js';

import authenticateUser from './src/middleware/authMidlleware.js';
import process from 'process';
//SECURITY SETUP
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import corsOptions from './src/middleware/corsOptions.js';
import hpp from 'hpp';
import cors from 'cors';

//ACCESS MIDDLEWARE
import {
    isAdmin,
    isAgent,
    isMediumAdmin,
    isMoneyGiver,
} from './src/middleware/index.js';

// ERRORS middleware
import notFoundMiddleware from './src/middleware/not-found.js';
import errorHandlerMiddleware from './src/middleware/error-handler.js';

//SET EXPRESS FRAMEWORK
import express from 'express';
const app = express();

//BODY PARSER
import bodyParser from 'body-parser';

app.set('trust proxy', 1);

// SECURITY MIDDLEWARE
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 400,
    })
);
app.use(helmet.hidePoweredBy());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
        },
    })
);
app.use(helmet.crossOriginEmbedderPolicy());
app.use(hpp());
app.use(corsOptions);
app.use(xss());

//PORT VARIABLES
const port = process.env.PORT || 1000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json({ limit: '1kb' }));
app.use(express.static(path.resolve(process.cwd(), 'client/build')));
//SET COOKIE PARSER, SESSIONS AND FLASH

//SESSION STOREE

//RENDER ERROR LIMTED MESSAGE THEN REDIRECT

//RENDER 404 ERROR NOT FOUND

//VIEW ENGINES
app.set('views', 'views');
app.set('view engine', 'ejs');

//ADMIN ROUTES
app.use('/admin', authenticateUser, isAdmin, adminDashboardRoutes);
app.use('/admin', authenticateUser, isAdmin, adminUserManagmentRoutes);
app.use('/admin', authenticateUser, isAdmin, adminAgentManagmentRoutes);

//MED ADMIN ROUTES
app.use('/med-admin', authenticateUser, isMediumAdmin, mediumAdminRoutes);

//AGENT ROUTES
app.use('/agent', authenticateUser, isAgent, agentsRoutes);

//MONEY GIVER ROUTES
app.use('/moneygiver', authenticateUser, isMoneyGiver, moneyGiverRoutes);

//SHARED ROUTES
app.use('/shared', authenticateUser, sharedRoutes);

//AUTH ROUTES
app.use('/user', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async (req, res) => {
    try {
        connectDB(process.env.MONGO_LINK);
        app.listen(process.env.PORT || 1000, '0.0.0.0', () =>
            console.log(`Server is listening on port : ${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
