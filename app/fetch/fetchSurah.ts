import { useSurahStore } from '@/zustand/store';
import api from '../../interceptor/apiInterceptor';

export const fethSurah = async () => {
  const { setIsLoading, setSurah } = useSurahStore()
  try {
    const res = await api.get("/surat");

    setIsLoading(false);
    setSurah(res.data.data);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};