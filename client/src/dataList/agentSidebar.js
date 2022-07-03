import {
  PdfIcon,
  FileAddIcon,
  ChangePasswordIcon,
  TransferIcon,
  ExchangeIcon,
} from '../assets/icons';

export const data = [
  {
    title: 'Transfert',
    path: '/agent/transferts',
    icon: TransferIcon,
  },
  {
    title: 'Ajouter Transfert',
    path: '/shared/add-transfert',
    icon: FileAddIcon,
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
