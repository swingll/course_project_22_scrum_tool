import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchTimelines } from "./actions";
import { TimelinesState } from "./reducer";
import { deleteTimeline, getTimeline, newTimeline, setTimeline } from "./service";

export function useTimelines(): TimelinesState {
  return useSelector<AppState, AppState['timeline']>((state) => state.timeline);
}

export function useFetchTimelines(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchTimelines({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchTimelines({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchStory(): [(id: string) => Promise<any>] {
  const fetchTimeline = useCallback((id: string) => {
    return getTimeline(id);
  }, []);

  return [fetchTimeline];
}

export function useCreateTimeline(): [(data: any) => Promise<any>] {
  const createTimeline = useCallback((data: any) => {
    return newTimeline(data);
  }, []);

  return [createTimeline];
}

export function useUpdateTimeline(): [(data: any) => Promise<any>] {
  const udpateTimeline = useCallback((data: any) => {
    return setTimeline(data);
  }, []);

  return [udpateTimeline];
}

export function useDeleteTimeline(): [(id: string) => Promise<any>] {
  const removeTimeline = useCallback((id: string) => {
    return deleteTimeline(id);
  }, []);

  return [removeTimeline];
}