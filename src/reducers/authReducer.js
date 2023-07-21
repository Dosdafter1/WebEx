const authReducer = (state, {type, payload}) => {
    
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth:true,
                user: payload.user,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth:false,
                user: null,
            }
        default:
            return state
    }
    
}
export default authReducer