const cors = require('cors');


const corsOptions = {
	origin : 'localhost:1000'
};

module.exports = cors(corsOptions);
