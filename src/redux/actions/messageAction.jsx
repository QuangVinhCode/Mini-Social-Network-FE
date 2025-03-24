import MessageService from "../../services/messageService";
import {
  MESSAGE_DELETE,
  MESSAGE_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
} from "./actionTypes";

export const sendMessage = (object) => async (dispatch) => {
  const service = new MessageService();
  try {
    console.log("Thêm Tin nhắn");
    const response = await service.sendMessage(object);

    if (response.status === 201) {
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Tin nhắn đã được thêm",
      });
      console.log(response);
      return response.data.data;
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = (userId1, userId2) => async (dispatch) => {
  const service = new MessageService();
  try {
    console.log("Danh sách Tin nhắn");
    const response = await service.getMessages(userId1, userId2);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLastMessage = (id) => async (dispatch) => {
  const service = new MessageService();
  try {
    console.log("Danh sách Tin nhắn");
    const response = await service.getLastMessage(id);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    
  }
};

export const deletedMessage = (id) => async (dispatch) => {
  const service = new MessageService();
  try {
    console.log("Xóa Tin nhắn Action");
    const response = await service.deleteMessage(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: MESSAGE_DELETE,
        payload: id,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearMessageState = () => (dispatch) => {
  dispatch({ type: MESSAGE_STATE_CLEAR });
};
