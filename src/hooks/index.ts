import {useEffect, useState} from 'react';

export const useTrxStatus = (status: string) => {
  const [statusLabel, setStatusLabel] = useState('');
  const [statusStyle, setStatusStyle] = useState({});

  useEffect(() => {
    switch (status) {
      case 'SUCCESS':
        setStatusLabel('Berhasil');
        setStatusStyle({
          color: '#fff',
          borderColor: '#58b486',
          backgroundColor: '#58b486',
        });
        break;
      case 'PENDING':
        setStatusLabel('Pengecekan');
        setStatusStyle({
          color: '#000',
          borderColor: '#f26947',
          backgroundColor: '#fff',
        });
        break;
      default:
        setStatusStyle('primary');
        break;
    }
  }, [status]);

  return {label: statusLabel, style: statusStyle};
};
