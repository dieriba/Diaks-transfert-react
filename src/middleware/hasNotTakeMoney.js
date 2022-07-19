import Transfert from '../models/transfert.js';
import MoneyTaker from '../models/moneyTaker.js';
import { UnauthorizedError } from '../../errors/index.js';

const checkIfHasTakeMoney = async (req, res, next) => {
    const { id } = req.params;
    const transfert = await Transfert.findById(id);
    if (transfert.hasTakeMoney) {
        next(
            new UnauthorizedError(
                "Modification/Supression impossible car le client a déjà récupéré l'argent"
            )
        );
    }

    next();
};

const checkIfMoneytakerHasTakeMoney = async (req, res, next) => {
    const { id } = req.params;
    const moneyTaker = await MoneyTaker.findById(id);
    if (moneyTaker.hasTakeMoney) {
        next(
            new UnauthorizedError(
                "Modification/Supression impossible car le client a déjà récupéré l'argent"
            )
        );
    }

    next();
};

const editCheck = async (req, res, next) => {
    const { id } = req.params;
    const transfert = await Transfert.findById(id);
    if (transfert.hasTakeMoney) {
        next(
            new UnauthorizedError(
                "Modification/Supression impossible car le client a déjà récupéré l'argent"
            )
        );
    }
    next();
};

export { checkIfHasTakeMoney, checkIfMoneytakerHasTakeMoney, editCheck };
