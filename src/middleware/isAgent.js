import { UnauthenticatedError } from '../../errors/index.js';

const isAgent = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'agent')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isAgent;
