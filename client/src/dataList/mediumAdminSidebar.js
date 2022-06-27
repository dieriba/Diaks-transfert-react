import { BiTransfer } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GrGroup } from 'react-icons/gr';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiConvertio } from 'react-icons/si';
import { FaCity } from 'react-icons/fa';

export const data = [
  {
    title: 'Transfert',
    path: '/admin/dashboard',
    icon: <BiTransfer />,
  },
  {
    title: 'Ajouter Récupérateur',
    path: '/med-admin/add-money-taker',
    icon: <AiOutlineUserAdd />,
  },
  {
    title: 'Récupérateurs',
    path: '/shared/list-money-takers',
    icon: <GrGroup />,
  },
  {
    title: 'Conakry',
    path: '/med-admin/dashboard/?city=CONAKRY',
    icon: <FaCity />,
  },
  {
    title: 'KINDIA',
    path: '/med-admin/dashboard/?city=KINDIA',
    icon: <FaCity />,
  },
  {
    title: 'BOKE',
    path: '/med-admin/dashboard/?city=BOKE',
    icon: <FaCity />,
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
