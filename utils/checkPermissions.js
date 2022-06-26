import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, requestedRessourceId) => {

    if (requestUser.userAgentId === requestedRessourceId.toString()) return;
    if (requestUser.role === 'highAdmin' || requestUser.role === 'admin') return;
    throw new UnauthenticatedError('Not authorized to acces this route');
};

export default checkPermissions;
