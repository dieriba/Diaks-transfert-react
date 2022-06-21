import { BiTransfer } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ImCalculator } from 'react-icons/im';
import { SiConvertio } from 'react-icons/si';

export const data = [
  {
    title: 'Transfert',
    path: '/agent/dashboard',
    icon: <BiTransfer />,
  },
  {
    title: 'Ajouter Transfert',
    path: '/shared/add-transfert',
    icon: <AiOutlineFileAdd />,
  },
  {
    title: 'Calcul',
    path: '/agent/calcul',
    icon: <ImCalculator />,
  },
  {
    title: 'Convertisseur',
    path: '/shared/converter',
    icon: <SiConvertio />,
  },
  {
    title: 'Modifier Mot de passe',
    path: '/shared/change-password',
    icon: <RiLockPasswordLine />,
  },
];
