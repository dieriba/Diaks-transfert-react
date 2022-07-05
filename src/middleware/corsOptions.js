import cors from 'cors';

const corsOptions = {
    origin: 'https://diaks-reacst.herokuapp.com',
    
};

export default cors(corsOptions);
