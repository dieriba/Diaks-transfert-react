import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, requestedRessourceId) => {
    if (requestUser.userId === requestedRessourceId.toString()) return;
    if (requestUser.isHighAdmin) return;
    throw new UnauthenticatedError('Not authorized to acces this route');
};

export default checkPermissions;
