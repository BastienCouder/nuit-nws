import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;