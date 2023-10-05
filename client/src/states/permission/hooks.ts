import {useSignedIn, useUser, useUserProfile} from "../user/hooks";
import {useSelector} from "react-redux";
import {AppState} from "../index";

let checkAuthorize = (roles,domain,permission):boolean=>{
    try{
        let permissions = useSelector<AppState,AppState['permission']>(state=>state.permission)
        for(let role of roles){
            if(permission[role].includes(permission.charAt(0)) || permission[role].includes(permission)){
                return true
            }
        }
        return false
    }catch(e){
        return false
    }
}
export let useAuthorize = (domain,permission):boolean=>{
    const logged = useSignedIn()
    let _roles
    if(!logged){
        _roles = ["default"]
    }else{
        const profile = useUserProfile()
        if(profile && profile.roles){
            _roles = [...profile.roles,"ROLE_USER"]
        }else{
            return false;
        }
    }
    return checkAuthorize(_roles,domain,permission)
}