import { UnauthenticatedError } from '../../errors/index.js';

const isMoneyGiver = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'moneyGiver')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isMoneyGiver;
