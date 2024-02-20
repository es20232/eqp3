import dayjs from 'dayjs';

const formatDate = (e: string) => {
  return dayjs(e).locale('pt-br').format('DD/MM/YYYY HH:mm:ss');
}

export default formatDate