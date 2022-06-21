import { BiTransfer } from 'react-icons/bi';
import { AiOutlineUserAdd, AiOutlineFileAdd } from 'react-icons/ai';
import { GrGroup } from 'react-icons/gr';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ImCalculator } from 'react-icons/im';
import { SiConvertio } from 'react-icons/si';

export const data = [
  {
    title: 'Transfert',
    path: '/admin/dashboard',
    icon: BiTransfer,
  },
  {
    title: 'Ajouter Transfert',
    path: '/shared/add-transfert',
    icon: AiOutlineFileAdd ,
  },
  {
    title: 'Utilisateurs',
    path: '/admin/users',
    icon: GrGroup,
  },
  {
    title: 'Ajouter Utilisateur',
    path: '/admin/add-user',
    icon: AiOutlineUserAdd,
  },
  {
    title: 'Liste Agents',
    path: '/admin/agents',
    icon: GrGroup,
  },
  {
    title: 'Ajouter Agent',
    path: '/admin/add-agent',
    icon: AiOutlineUserAdd,
  },
  {
    title: 'Récupérateurs',
    path: '/shared/list-money-takers',
    icon: GrGroup,
  },
  {
    title: 'Convertisseur',
    path: '/shared/converter',
    icon: SiConvertio,
  },
  {
    title: 'Calcul',
    path: '/admin/calcul',
    icon: ImCalculator,
  },
  {
    title: 'Modifier Mot de passe',
    path: '/shared/change-password',
    icon: RiLockPasswordLine,
  },
];
