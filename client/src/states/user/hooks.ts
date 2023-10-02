import React from "react";
import { useSelector, batch } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { clearUser, setUserProfile, setUserToken } from "./actions";
import { UserState } from "./reducer";

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