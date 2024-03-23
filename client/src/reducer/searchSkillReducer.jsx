const initialState={
    searchSkills:[]
}

const searchSkillReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_SKILL':
            return {
                ...state,
                searchSkills:[...state.searchSkills,action.payload]
            }
        case 'REMOVE_SKILL':
            return {
                ...state,
                searchSkills:state.searchSkills.filter(skill=>skill!=action.payload)
            }
        default:
            return state;
    }
};

export default searchSkillReducer;