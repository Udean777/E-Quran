import { useQuery } from '@tanstack/react-query';
import api from '../../interceptor/apiInterceptor';

export function fetchTafsir(id: any) {
    const { data: tafsirs, isLoading: isLoadingTafsir } = useQuery({
        queryKey: ['tafsir', id],
        queryFn: async function () {
            try {
                const res = await api.get(`/tafsir/${id}`);

                return res.data.data.tafsir;
            } catch (error) {
                console.log(error);
            }
        },
    });

    return { tafsirs, isLoadingTafsir };
}
