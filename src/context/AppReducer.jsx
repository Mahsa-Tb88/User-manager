export function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setIsMultiLoading":
      return { ...state, isMultiLoading: payload };
    case "setUsers":
      return { ...state, users: payload, isMultiLoading: false };
    case "setBranches":
      return { ...state, branches: payload, isMultiLoading: false };
    case "setMultiLoadingError":
      return { ...state, multiLoadingError: payload };
    case "setPageTitle":
      return {
        ...state,
        pageTitle: payload,
      };
    case "backToHome":
      return { ...state, singleLoadingError: payload, pageTitle: "Home" };
    case "setIsSingleLoading":
      return { ...state, isSingleLoading: payload };
    case "setSingleLoadingError":
      return { ...state, singleLoadingError: payload };
    case "deleteUser":
      return { ...state, users: payload, pageTitle: "Home" };
    case "setPageTitle":
      return { ...state, pageTitle: payload };
    case "createNewUser":
      return { ...state, users: [...state.users, payload] };
    case "updateUser":
      return { ...state, users: [...state.users, payload] };
    case "createNewBranch":
      return { ...state, branches: [...state.branches, payload] };
  }
  throw new Error("Invalid Action");
}
