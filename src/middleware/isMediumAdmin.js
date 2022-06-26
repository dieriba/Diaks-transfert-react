import { UnauthenticatedError } from '../../errors/index.js';

const isMediumAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'isMediumAdmin')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isMediumAdmin;
