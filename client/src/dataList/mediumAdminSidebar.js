import {
  EuroIcon,
  PdfIcon,
  UserAddIcon,
  UserGroupIcon,
  ChangePasswordIcon,
  TransferIcon,
  ExchangeIcon,
} from '../assets/icons';

export const data = [
  {
    title: 'Transfert',
    path: '/med-admin/transferts',
    icon: TransferIcon,
  },
  {
    title: 'Ajouter Récupérateur',
    path: '/med-admin/add-money-takers',
    icon: UserAddIcon,
  },
  {
    title: 'Récupérateurs',
    path: '/shared/list-money-takers',
    icon: UserGroupIcon,
  },
  {
    title: 'Taux',
    path: '/med-admin/rate',
    icon: EuroIcon,
  },
  {
    title: 'Convertisseur',
    path: '/shared/converter',
    icon: ExchangeIcon,
  },
  {
    title: 'PDF',
    path: '/shared/pdf',
    icon: PdfIcon,
  },
  {
    title: 'Modifier Mot de passe',
    path: '/shared/change-password',
    icon: ChangePasswordIcon,
  },
];
