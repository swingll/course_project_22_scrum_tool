import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchTimelinelinks } from "./actions";
import { TimelinelinkState } from "./reducer";
import { deleteTimelinelink, getTimelinelink, newTimelinelink, setTimelinelink } from "./service";

export function useTimelinelinks(): TimelinelinkState {
  return useSelector<AppState, AppState['timelinelink']>((state) => state.timelinelink);
}

export function useFetchTimelinelinks(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchTimelinelinks({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchTimelinelinks({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchTimelinelink(): [(id: string) => Promise<any>] {
  const fetchTimelinelink = useCallback((id: string) => {
    return getTimelinelink(id);
  }, []);

  return [fetchTimelinelink];
}

export function useCreateTimelinelink(): [(data: any) => Promise<any>] {
  const createTimelinelink = useCallback((data: any) => {
    return newTimelinelink(data);
  }, []);

  return [createTimelinelink];
}

export function useUpdateTimelinelink(): [(data: any) => Promise<any>] {
  const udpateTimelinelink = useCallback((data: any) => {
    return setTimelinelink(data);
  }, []);

  return [udpateTimelinelink];
}

export function useDeleteTimelinelink(): [(id: string) => Promise<any>] {
  const removeTimelinelink = useCallback((id: string) => {
    return deleteTimelinelink(id);
  }, []);

  return [removeTimelinelink];
}