import {
  EuroIcon,
  PdfIcon,
  FileAddIcon,
  UserAddIcon,
  UserGroupIcon,
  ChangePasswordIcon,
  TransferIcon,
  ExchangeIcon
} from '../icons';

export const data = [
  {
    title: 'Transfert',
    path: '/admin/dashboard',
    icon: TransferIcon,
  },
  {
    title: 'Ajouter Transfert',
    path: '/shared/add-transfert',
    icon: FileAddIcon,
  },
  {
    title: 'Utilisateurs',
    path: '/admin/users',
    icon: UserGroupIcon,
  },
  {
    title: 'Ajouter Utilisateur',
    path: '/admin/add-user',
    icon: UserAddIcon,
  },
  {
    title: 'Liste Agents',
    path: '/admin/agents',
    icon: UserGroupIcon,
  },
  {
    title: 'Ajouter Agent',
    path: '/admin/add-agent',
    icon: UserAddIcon,
  },
  {
    title: 'Récupérateurs',
    path: '/shared/list-money-takers',
    icon: UserGroupIcon,
  },
  {
    title: 'Convertisseur',
    path: '/shared/converter',
    icon: ExchangeIcon,
  },
  {
    title: 'PDF',
    path: '/shared/change-password',
    icon: PdfIcon,
  },
  {
    title: 'Modifier Mot de passe',
    path: '/shared/change-password',
    icon: ChangePasswordIcon,
  },
  
  
];
