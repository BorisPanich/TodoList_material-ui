import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValuesType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}
export type ActionTypes = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeFilterActionType |
    ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolistId = v1();
            let newTodolist: TodoListType = {id: newTodolistId, title: action.title, filter: 'all'}
            return [newTodolist, ...state]      // return state.push(newTodolist)  // модифицированное содержимое исходного массива
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "CHANGE-FILTER": {
            // let todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     todolist.filter = action.filter;
            //     return [...state]
            // }
            // return state

            // это позволяет объеденить все нашие методы в один
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            // const todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = action.title;
            //     return [...state]
            // }
            // return state

            // это позволяет объеденить все нашие методы в один
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (newTodolistTitle: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle}
}
