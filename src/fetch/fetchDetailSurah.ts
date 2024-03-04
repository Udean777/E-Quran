import {useQuery} from '@tanstack/react-query';
import api from '../../interceptor/apiInterceptor';

export function fetchDetailSurah(id: any) {
  const {data: detailSurah, isLoading} = useQuery({
    queryKey: ['surahDetail', id],
    queryFn: async function () {
      try {
        const res = await api.get(`/surat/${id}`);

        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {detailSurah, isLoading};
}
