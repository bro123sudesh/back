const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cors = require('./middleware/cors');
const conenctDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
conenctDB();

//Route files
const auth = require('./routes/auth');
const video = require('./routes/video');

const app = express();

//Body parser
app.use(express.json());
app.use(cors);
//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//Mount router
app.use('/api/v1/auth', auth);
app.use('/api/v1/video', video);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error:${err.message}`.red);
	//Close server & exit process
	server.close(() => process.exit(1));
});
