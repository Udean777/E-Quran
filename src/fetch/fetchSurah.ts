import api from '../../interceptor/apiInterceptor';
import { useQuery } from "@tanstack/react-query"

export function fetchSurah() {
  const { data: surah, isLoading } = useQuery({
    queryKey: ['surah'],
    queryFn: async function () {
      try {
        const res = await api.get('/surat');

        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { surah, isLoading };
}
