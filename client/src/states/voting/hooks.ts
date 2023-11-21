import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchVotings } from "./actions";
import { VotingsState } from "./reducer";
import { deleteVoting, getVoting, getVotingByTask, newVoting, setVoting } from "./service";

export function useVotings(): VotingsState {
  return useSelector<AppState, AppState['voting']>((state) => state.voting);
}

export function useFetchVotings(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchVotings({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchVotings({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchVoting(): [(id: string) => Promise<any>] {
  const fetchVoting = useCallback((id: string) => {
    return getVoting(id);
  }, []);

  return [fetchVoting];
}

export function useFetchVotingByTask(): [(id: string) => Promise<any>] {
  const fetchVoting = useCallback((id: string) => {
    return getVotingByTask(id);
  }, []);

  return [fetchVoting];
}

export function useCreateVoting(): [(data: any) => Promise<any>] {
  const createVoting = useCallback((data: any) => {
    return newVoting(data);
  }, []);

  return [createVoting];
}

export function useUpdateVoting(): [(data: any) => Promise<any>] {
  const udpateVoting = useCallback((data: any) => {
    return setVoting(data);
  }, []);

  return [udpateVoting];
}

export function useDeleteVoting(): [(id: string) => Promise<any>] {
  const removeVoting = useCallback((id: string) => {
    return deleteVoting(id);
  }, []);

  return [removeVoting];
}