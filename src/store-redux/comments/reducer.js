// Начальное состояние
import {addCommentToTree} from "../../utils/add-comment-to-tree";

const initialState = {
  data: [],
  waiting: false
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    case "comments/send":
      return { ...state, data: addCommentToTree(action.payload.data.result, state.data), waiting: false }
    case "comments/reply":
      return { ...state, data: addCommentToTree(action.payload.data.result, state.data), waiting: false}
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
