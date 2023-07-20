const authReducer = (state, {type, payload}) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth:true,
                user: payload.user,
                role: payload.role,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth:false,
                user: null,
                role: null
            }
        default:
            return state
    }
}
export default authReducer