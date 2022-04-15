export const InitialState = {
    value: 'none',
    selectMode: 'pituka'
}

const DataReducer = (state, action) => {
    switch (action.type) {
        case 'KEY_PRESSED':
            console.log('hi ' , action.val);
            return {
                ...state,
                value: action.val,
                selectMode: 'kaspa'
            }
        case 'TEST':
            console.log('hello');
            return {...state}
        default:
            return {...state};
    }
}

export default DataReducer;