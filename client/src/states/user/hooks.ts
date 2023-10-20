import React, {useCallback, useEffect} from "react";
import { useSelector, batch } from "react-redux";
import { AppState, useAppDispatch } from "..";
import {clearUser, fetchUsers, setUserProfile, setUserToken} from "./actions";
import { UserState } from "./reducer";
import {AnyAction} from "@reduxjs/toolkit";

export function useUser(): UserState {
  return useSelector<AppState, AppState['user']>((state) => state.user);
}

export function useSignedIn(): boolean {
  const { token } = useUser();
  return React.useMemo(() => token !== '', [token]);
}

export function useSignout(): [() => void] {
  const dispatch = useAppDispatch()
  const setLogout = React.useCallback(
    () => {
      batch(() => {
        dispatch(clearUser());
      })
    },
    [dispatch],
  );
  return [setLogout];
}

export function useSignin(): [(token: string) => void, (profile: any) => void] {
    const dispatch = useAppDispatch()
  
    const setToken = React.useCallback(
        (token: string) => {
          dispatch(setUserToken({ token }))
        },
        [dispatch],
    )

    const setProfile = React.useCallback(
        (profile: any) => {
          dispatch(setUserProfile({ profile }))
        },
        [dispatch],
    )
  
    return [setToken, setProfile]
}

export function useUserProfile(){
    try{
        return useSelector<AppState, AppState['user']>((state)=>state.user).profile
    }catch (e){
        return null
    }
}
export function useUsers(){
    return useSelector<AppState,AppState['user']['users']>((state)=>state.user.users)
}
export function useFetchUsers(init?: boolean) {
    const dispatch = useAppDispatch();
    const logged = useSignedIn();

    useEffect(() => {
        if (logged && init) {
            dispatch(fetchUsers({ logged }) as unknown as AnyAction)
        }
    }, [dispatch, init, logged]);

    const fetch = useCallback(() => {
        if (logged) {
            dispatch(fetchUsers({ logged }) as unknown as AnyAction)
        }
    }, [dispatch, logged]);

    return [fetch];
}