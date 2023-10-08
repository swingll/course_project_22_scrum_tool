import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchTlinedetails } from "./actions";
import { TlinedetailsState } from "./reducer";
import { deleteTlinedetail, getTlinedetail, newTlinedetail, setTlinedetail } from "./service";

export function useTlinedetails(): TlinedetailsState {
  return useSelector<AppState, AppState['tlinedetail']>((state) => state.tlinedetail);
}

export function useFetchTlinedetails(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchTlinedetails({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchTlinedetails({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchTlinedetail(): [(id: string) => Promise<any>] {
  const fetchTlinedetail = useCallback((id: string) => {
    return getTlinedetail(id);
  }, []);

  return [fetchTlinedetail];
}

export function useCreateTlinedetail(): [(data: any) => Promise<any>] {
  const createTlinedetail = useCallback((data: any) => {
    return newTlinedetail(data);
  }, []);

  return [createTlinedetail];
}

export function useUpdateTlinedetail(): [(data: any) => Promise<any>] {
  const udpateTlinedetail = useCallback((data: any) => {
    return setTlinedetail(data);
  }, []);

  return [udpateTlinedetail];
}

export function useDeleteTlinedetail(): [(id: string) => Promise<any>] {
  const removeTlinedetail = useCallback((id: string) => {
    return deleteTlinedetail(id);
  }, []);

  return [removeTlinedetail];
}