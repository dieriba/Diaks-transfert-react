import cors from 'cors';

const corsOptions = {
    origin: 'https://diaks-app.herokuapp.com/',
};

export default cors(corsOptions);
