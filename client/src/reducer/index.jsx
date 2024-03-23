import { combineReducers } from "redux";
import searchSkillReducer from "./searchSkillReducer";

const rootReducer=combineReducers({
    searchSkill:searchSkillReducer
})

export default rootReducer;