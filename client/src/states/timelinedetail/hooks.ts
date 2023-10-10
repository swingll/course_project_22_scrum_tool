import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchTimelinedetails } from "./actions";
import { TimelinedetailsState } from "./reducer";
import { deleteTimelinedetail, getTimelinedetail, newTimelinedetail, setTimelinedetail } from "./service";

export function useTimelinedetails(): TimelinedetailsState {
  return useSelector<AppState, AppState['timelinedetail']>((state) => state.timelinedetail);
}

export function useFetchTimelinedetails(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchTimelinedetails({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchTimelinedetails({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchTimelinedetail(): [(id: string) => Promise<any>] {
  const fetchTimelinedetail = useCallback((id: string) => {
    return getTimelinedetail(id);
  }, []);

  return [fetchTimelinedetail];
}

export function useCreateTimelinedetail(): [(data: any) => Promise<any>] {
  const createTimelinedetail = useCallback((data: any) => {
    return newTimelinedetail(data);
  }, []);

  return [createTimelinedetail];
}

export function useUpdateTimelinedetail(): [(data: any) => Promise<any>] {
  const udpateTimelinedetail = useCallback((data: any) => {
    return setTimelinedetail(data);
  }, []);

  return [udpateTimelinedetail];
}

export function useDeleteTimelinedetail(): [(id: string) => Promise<any>] {
  const removeTimelinedetail = useCallback((id: string) => {
    return deleteTimelinedetail(id);
  }, []);

  return [removeTimelinedetail];
}