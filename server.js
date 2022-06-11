/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
require('dotenv').config({ path: './config/.env' });
//MONGOOSE DB
const connectDB = require('./db/connectDB');

const adminDashboardRoutes = require('./src/routes/transfert');
const adminUserManagmentRoutes = require('./src/routes/user');
const adminAgentManagmentRoutes = require('./src/routes/agent');

const mediumAdminRoutes = require('./src/routes/moneyTaker');

const agentsRoutes = require('./src/routes/userAgent');

const moneyGiverRoutes = require('./src/routes/moneyGiver');

const sharedRoutes = require('./src/routes/shared');

const authRoutes = require('./src/routes/auth');

//SECURITY SETUP
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const corsOptions = require('./src/middleware/corsOptions');
const hpp = require('hpp');

// ERRORS middleware
const notFoundMiddleware = require('./src/middleware/not-found');
const errorHandlerMiddleware = require('./src/middleware/error-handler');


//SET EXPRESS FRAMEWORK
const express = require('express');
const app = express();

//BODY PARSER
const bodyParser = require('body-parser');

app.set('trust proxy', 1);

// SECURITY MIDDLEWARE
app.use(rateLimit({
	windowMs : 15 * 60 * 1000,
	max : 400
}));
app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: true,
			directives: {
				'script-src': [
					// eslint-disable-next-line quotes
					"'self'",
					'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js',
				],
				'img-src': [
					// eslint-disable-next-line quotes
					"'self'",
					'https://www.gstatic.com/images/branding/product/2x/translate_24dp.png',
				],
			},
		},
	})
);
app.use(hpp());
app.options('*', corsOptions);
app.use(corsOptions);
app.use(xss());



//PORT VARIABLES
const port = process.env.PORT || 1000;

//SET STATIC FILE
app.use(express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json({ limit: '1kb' }));

//SET COOKIE PARSER, SESSIONS AND FLASH




//SESSION STOREE

//RENDER ERROR LIMTED MESSAGE THEN REDIRECT

//RENDER 404 ERROR NOT FOUND

//VIEW ENGINES
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.redirect('/user/login');
});

//ADMIN ROUTES
app.use('/admin',  adminDashboardRoutes);
app.use('/admin', adminUserManagmentRoutes);
app.use('/admin',  adminAgentManagmentRoutes);

//MED ADMIN ROUTES
app.use('/med-admin', mediumAdminRoutes);

//AGENT ROUTES
app.use('/agent',  agentsRoutes);

//MONEY GIVER ROUTES
app.use('/money',  moneyGiverRoutes);

//SHARED ROUTES
app.use('/shared',  sharedRoutes);

//AUTH ROUTES
app.use('/user', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async (req, res) => {
	try {
		connectDB(process.env.MONGO_LINK);
		app.listen(port, () =>
			console.log(`Server is listening on port : ${port}`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
