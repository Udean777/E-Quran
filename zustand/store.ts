import api from "@/interceptor/apiInterceptor";
import { create } from "zustand";

interface DetailStore {
    detailSurah: any;
    tafsirs: any[];
    tafsirData: any;
    isLoading: boolean;
    isLoadingTafsir: boolean;
    selectedAyat: any;
    sound: any;
    isPlaying: boolean;
    fetchDetailSurah: (detail: any) => void;
    fetchTafsirs: (detail: any) => void;
    setSound: (sound: any) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsLoadingTafsir: (isLoadingTafsir: boolean) => void;
    setDetailSurah: (detailSurah: any) => void;
    setTafsirData: (tafsirData: any) => void;
}


const useDetailStore = create<DetailStore>((set) => ({
    detailSurah: null,
    tafsirs: [],
    tafsirData: {},
    isLoading: true,
    isLoadingTafsir: true,
    selectedAyat: null,
    sound: null,
    isPlaying: false,
    fetchDetailSurah: async (detail: any) => {
        try {
            const res = await api.get(`/surat/${detail}`);
            set(state => ({ ...state, detailSurah: res.data.data, isLoading: false }));
        } catch (error) {
            console.log("Error fetching detail surah", error);
            set(state => ({ ...state, isLoading: false }));
        }
    },
    fetchTafsirs: async (detail: any) => {
        try {
            const res = await api.get(`/tafsir/${detail}`);
            set(state => ({ ...state, tafsirs: res.data.data.tafsir, isLoadingTafsir: false }));
        } catch (error) {
            console.log("Error fetching tafsirs", error);
            set(state => ({ ...state, isLoadingTafsir: false }));
        }
    },
    setSound: (sound) => set({ sound }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsLoadingTafsir: (isLoadingTafsir) => set({ isLoadingTafsir }),
    setDetailSurah: (detailSurah) => set({ detailSurah }),
    setTafsirData: (tafsirData) => set({ tafsirData }),
}));

export default useDetailStore;