function updateUserReducer(state, action){
    if (action.type === 'users/updateUser') {
        return{
            ...state,
            operatingUser : action.payload
        }
    }
    
    return state;
}