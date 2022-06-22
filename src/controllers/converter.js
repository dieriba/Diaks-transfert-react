/* eslint-disable linebreak-style */
import Rate from '../models/rates.js';
import { NotFoundError } from '../../errors/index.js';

const rate = async (req, res, next) => {
    try {
        const rate = await Rate.findOneAndUpdate(
            { _id: '62764205c1cf091846cea5c6' },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!rate) {
            return next(
                new NotFoundError(
                    "Il n'existe pas de récupérateurs avec cet ID"
                )
            );
        }

        res.status(200).json({
            message: 'Taux modifié avec succès',
            status: 'sucess',
        });
    } catch (error) {
        next(error);
    }
};

export { rate };
