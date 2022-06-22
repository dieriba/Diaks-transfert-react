import cors from 'cors';

const corsOptions = {
    origin: 'localhost:1000',
};

export default cors(corsOptions);
