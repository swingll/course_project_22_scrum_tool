import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchStories } from "./actions";
import { StoryState } from "./reducer";
import { deleteStory, getStory, newStory, setStory } from "./service";

export function useStories(): StoryState {
  return useSelector<AppState, AppState['story']>((state) => state.story);
}

export function useFetchStories(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchStories({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchStories({ logged }) as unknown as AnyAction)
      return Promise.resolve()
    }else{
      return Promise.reject()
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchStory(): [(id: string) => Promise<any>] {
  const fetchStory = useCallback((id: string) => {
    return getStory(id);
  }, []);

  return [fetchStory];
}

export function useCreateStory(): [(data: any) => Promise<any>] {
  const createStory = useCallback((data: any) => {
    return newStory(data);
  }, []);

  return [createStory];
}

export function useUpdateStory(): [(data: any) => Promise<any>] {
  const udpateStory = useCallback((data: any) => {
    return setStory(data);
  }, []);

  return [udpateStory];
}

export function useDeleteStory(): [(id: string) => Promise<any>] {
  const removeStory = useCallback((id: string) => {
    return deleteStory(id);
  }, []);

  return [removeStory];
}