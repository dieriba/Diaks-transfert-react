import { UnauthenticatedError } from '../../errors/index.js';

const isAdmin = (req, res, next) => {
    const { userRole } = req.user;
    if (userRole !== 'highAdmin' && userRole !== 'admin')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isAdmin;
