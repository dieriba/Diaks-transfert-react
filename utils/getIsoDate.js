import moment from 'moment';


//** Returns now in ISO format in Central Time */
const  getNowISO = (date) => {
  return `${date.toISOString(true).substring(0, 23)}Z`
}

export default getNowISO;