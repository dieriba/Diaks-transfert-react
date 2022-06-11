const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const notFound = require('./not-found');
const unauthorized = require('./unauthorized');

module.exports = {
	CustomAPIError,
	BadRequestError,
	UnauthenticatedError,
	notFound,
	unauthorized
};
