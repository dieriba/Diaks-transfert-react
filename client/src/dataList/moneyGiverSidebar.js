import { VscChecklist } from 'react-icons/vsc';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

export const data = [
  {
    title: 'Recherche',
    path: '/money/search',
    icon: <AiOutlineFileSearch />,
  },
  {
    title: 'Transfert Effectué',
    path: '/money/taken',
    icon: <VscChecklist />,
  },
  {
    title: 'Modifier Mot de passe',
    path: '/shared/change-password',
    icon: <RiLockPasswordLine />,
  },
];
