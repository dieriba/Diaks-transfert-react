import { UnauthenticatedError } from '../../errors/index.js';

const isAgent = (req, res, next) => {
    const { userRole } = req.user;
    if (userRole !== 'agent')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isAgent;
