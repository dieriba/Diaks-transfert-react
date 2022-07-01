import {
  GET_AGENTS_QUERY,
  CHANGE_PAGE_AGENT,
  SET_EDIT_AGENT,
  GET_ALL_AGENTS,
  CANCEL_MODIFICATION_AGENT,
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  HANDLE_CHANGE,
  RESET_FORM,
} from '../action/agentAction';

const agentReducer = (state, action) => {
  const { type } = action;
  if (type === SET_LOADING_BEGIN) return { ...state, isLoading: true };
  if (type === SET_LOADING_SUCCESS)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
    };
  if (type === SET_LOADING_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'error',
    };

  if (type === DISPLAY_ERROR)
    return {
      ...state,
      alertText: action.payload.alertText,
      showAlert: true,
      errorStatus: 'error',
    };

  if (type === CLEAN_ERROR)
    return { ...state, showAlert: false, alertText: '' };

  if (type === HANDLE_CHANGE) {
    const { name, value } = action.payload;

    return {
      ...state,
      currentPage: 1,
      [name]: value,
    };
  }

  if (type === GET_AGENTS_QUERY) {
    return { ...state, agents: action.payload };
  }

  if (type === SET_EDIT_AGENT) {
    const agent = state.agents.find(agent => agent._id === action.payload);
    const { _id, phoneNumber, senderName, senderCode } = agent;
    return {
      ...state,
      isEditingAgent: true,
      editAgentId: _id,
      phoneNumberAgent: phoneNumber,
      senderNameUser: senderName,
      senderCode,
    };
  }

  if (type === GET_ALL_AGENTS) {
    const { agents, iterator, currentPage, endingLink, totalPages } =
      action.payload;

    return {
      ...state,
      agents,
      isLoading: false,
      senderName: agents[0]?.senderName,
      currentAgentPage: currentPage,
      totalPagesAgent: totalPages,
      endingLinkAgent: endingLink,
      iteratorAgent: iterator,
    };
  }

  if (type === RESET_FORM) {
    return {
      ...state,
      senderNameUser: '',
      phoneNumberAgent: '',
      currentAgentPage: 1,
    };
  }

  if (type === CHANGE_PAGE_AGENT)
    return { ...state, currentAgentPage: action.payload };

  if (type === CANCEL_MODIFICATION_AGENT)
    return {
      ...state,
      isEditingAgent: false,
      senderNameUser: '',
      phoneNumberAgent: '',
      senderCode: '',
    };
};

export default agentReducer;
