
type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            // state.age = state.age + 1;
            // return state;
            let newState = {...state}   // создаем копию
            newState.age = newState.age + 1;    // у копии можно менять количество
            return newState     // возвращаем копию
        case 'INCREMENT-CHILDREN-COUNT':
            // а можно и так, без создания промежуточных переменных
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I don't understand this type")
    }
}
