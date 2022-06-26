import { UnauthenticatedError } from '../../errors/index.js';

const isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'highAdmin')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isAdmin;
