import { useLocation } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Hook para obtener opbjecto javascript que desglosa la url contenida en el hook location
 * de react router.
 * 
 * @returns Retorna objeto que contiene informacion sobre la url utilizada por location
 */
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}