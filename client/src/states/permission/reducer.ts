import permissions from "./permissions";
import {createReducer} from "@reduxjs/toolkit";

let initializeState = permissions

export default createReducer(permissions,builder => {})