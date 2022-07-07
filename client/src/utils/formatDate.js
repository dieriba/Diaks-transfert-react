import moment from 'moment';
import 'moment/locale/fr';

export const formatDate = date => moment(date).format('L');
export const formatHours = date => moment(date).format('LT');
