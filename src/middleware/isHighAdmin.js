import { UnauthenticatedError } from '../../errors/index.js';

const isHighAdmin = (req, res, next) => {
    const { userRole } = req.user;
    console.log(userRole);
    if (userRole !== 'highAdmin')
        return next(
            new UnauthenticatedError(
                "Vous n'êtes pas autorisés à utiliser cette fonctionnalité"
            )
        );
    next();
};

export default isHighAdmin;
