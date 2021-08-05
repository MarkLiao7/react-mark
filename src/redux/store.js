import { createStore } from 'redux'

const TODOLIST_INIT = 'TODOLIST_INIT';
const TODOLIST_UPDATE = 'TODOLIST_UPDATE';
const TODOLIST_DELETE_ITEM = 'TODOLIST_DELETE_ITEM';
const SET_EDIT_ITEM_UUID = 'SET_EDIT_ITEM_UUID';
const SEARCH_BY_CONDITION = 'SEARCH_BY_CONDITION';
const CLEAR_SEARCH_RESULT_LIST = 'CLEAR_SEARCH_RESULT_LIST';
const SHOW_ADD_FORM = 'SHOW_ADD_FORM';
const RESET_ADD_FORM_TRIGGER = 'RESET_ADD_FORM_TRIGGER';
const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
const RESET_EDIT_FORM_TRIGGER = 'RESET_EDIT_FORM_TRIGGER';


// 初始狀態寫在Reducer 參數初始值
const initState = {
    todoList: {},
    searchResultList: null,
    editItemUuid: '',
    lastActionType: null,
    showAddFormTrigger: false,
    showEditFormTrigger: false,
}

function dataReducer(state = initState, action) {
    state.lastActionType = action.type
    switch (action.type) {
        case TODOLIST_INIT:
            state.todoList = action.payload;
            state.todoList = { ...state.todoList };
            return { ...state };
        case TODOLIST_UPDATE:
            // 回傳時要創造一個新的object 不能直接修改原本的值後回傳
            let { uuid } = action.payload
            state.todoList[uuid] = action.payload;
            state.todoList = { ...state.todoList };

            // 如果搜尋結果中存在,一併更新
            if (state.searchResultList && state.searchResultList[uuid]) {
                state.searchResultList[uuid] = action.payload;
                state.searchResultList = { ...state.searchResultList };
            }

            return { ...state };
        case TODOLIST_DELETE_ITEM:
            let deleteID = action.payload;
            delete state.todoList[deleteID];
            state.todoList = { ...state.todoList };

            // 如果搜尋結果中存在,一併刪除
            if (state.searchResultList && state.searchResultList[deleteID]) {
                delete state.searchResultList[deleteID];
                state.searchResultList = { ...state.searchResultList };
            }

            return { ...state };
        case SET_EDIT_ITEM_UUID:
            state.editItemUuid = action.payload;
            return { ...state };
        case SEARCH_BY_CONDITION:
            let condition = action.payload;
            let searchResult = {};
            Object.keys(state.todoList).forEach((key) => {
                let val = state.todoList[key];
                let isSwitchValueOK = false;
                let isInputTextValueOK = false;
                let isSelectValueOK = false;
                let isRadioValueOK = false;
                if (val.switchValue === condition.searchSwitchValue) {
                    isSwitchValueOK = true;
                }

                if (condition.searchInputTextValue === '' || val.inputTextValue.includes(condition.searchInputTextValue)) {
                    isInputTextValueOK = true;
                }

                if (condition.searchSelectValue === null || val.selectValue === condition.searchSelectValue) {
                    isSelectValueOK = true;
                }

                if (condition.searchRadioValue === null || val.radioValue === condition.searchRadioValue) {
                    isRadioValueOK = true;
                }

                if (isSwitchValueOK && isInputTextValueOK && isSelectValueOK && isRadioValueOK) {
                    searchResult[key] = val;
                }

            });

            state.searchResultList = searchResult;
            return { ...state };
        case CLEAR_SEARCH_RESULT_LIST:
            state.searchResultList = null;
            return { ...state };
        case SHOW_ADD_FORM:
            state.showAddFormTrigger = true;
            return { ...state };
        case SHOW_EDIT_FORM:
            state.showEditFormTrigger = true;
            return { ...state };
        case RESET_ADD_FORM_TRIGGER:
            state.showAddFormTrigger = false;
            return { ...state };
        case RESET_EDIT_FORM_TRIGGER:
            state.showEditFormTrigger = false;
            return { ...state };
        default:
            return state;
    }
}

const store = createStore(
    dataReducer,
);


store.subscribe(() => {

    // console.log(store.getState());

    switch (store.getState().lastActionType) {
        case TODOLIST_UPDATE:
        case TODOLIST_DELETE_ITEM:
            let todoListString = JSON.stringify(store.getState().todoList);
            localStorage.setItem("todoListData", todoListString);
            break;
        default:
    }

});

export const initTodoList = (data) => ({ type: TODOLIST_INIT, payload: data });
export const updateTodoList = (data) => ({ type: TODOLIST_UPDATE, payload: data });
export const deleteTodoListItem = (id) => ({ type: TODOLIST_DELETE_ITEM, payload: id });
export const setEditItemUuid = (uuid) => ({ type: SET_EDIT_ITEM_UUID, payload: uuid });
export const searchByCondition = (condition) => ({ type: SEARCH_BY_CONDITION, payload: condition });
export const clearSearchResultList = () => ({ type: CLEAR_SEARCH_RESULT_LIST });
export const showAddForm = () => ({ type: SHOW_ADD_FORM });
export const showEditForm = () => ({ type: SHOW_EDIT_FORM });
export const resetAddFormTrigger = () => ({ type: RESET_ADD_FORM_TRIGGER });
export const resetEditFormTrigger = () => ({ type: RESET_EDIT_FORM_TRIGGER });


export default store;