import { UnauthenticatedError } from '../../errors/index.js';

const isMoneyGiver = (req, res, next) => {
    const { userRole } = req.user;
    if (userRole !== 'moneyGiver')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isMoneyGiver;
