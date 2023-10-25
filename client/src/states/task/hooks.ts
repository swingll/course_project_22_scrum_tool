import { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { useSignedIn } from "../user/hooks";
import { fetchTasks } from "./actions";
import { TaskState } from "./reducer";
import { deleteTask, getTask, newTask, setTask } from "./service";

export function useTasks(): TaskState {
  return useSelector<AppState, AppState['task']>((state) => state.task);
}

export function useFetchTasks(init?: boolean) {
  const dispatch = useAppDispatch();
  const logged = useSignedIn();

  useEffect(() => {
    if (logged && init) {
      dispatch(fetchTasks({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, init, logged]);

  const fetch = useCallback(() => {
    if (logged) {
      dispatch(fetchTasks({ logged }) as unknown as AnyAction)
    }
  }, [dispatch, logged]);

  return [fetch];
}

export function useFetchTask(): [(id: string) => Promise<any>] {
  const fetchTask = useCallback((id: string) => {
    return getTask(id);
  }, []);

  return [fetchTask];
}

export function useCreateTask(): [(data: any) => Promise<any>] {
  const createTask = useCallback((data: any) => {
    return newTask(data);
  }, []);

  return [createTask];
}

export function useUpdateTask(): [(data: any) => Promise<any>] {
  const udpateTask = useCallback((data: any) => {
    return setTask(data);
  }, []);

  return [udpateTask];
}

export function useDeleteTask(): [(id: string) => Promise<any>] {
  const removeTask = useCallback((id: string) => {
    return deleteTask(id);
  }, []);

  return [removeTask];
}