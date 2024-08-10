import axios from "axios";
axios.defaults.baseURL = SERVER_URL;

async function getAllBranches() {
  try {
    const { data } = await axios.get("/branches");
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function getAllUsers() {
  try {
    const { data } = await axios.get("/users");
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function getBranches(search = "") {
  try {
    const { data } = await axios.get("/branches/", {
      params: { branch: search },
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function getUsers(search = "", branch) {
  try {
    const { data } = await axios.get("/branches/" + branch, {
      params: { user: search },
    });
    return data;
  } catch (error) {
    return { success: false, message: e.message };
  }
}

async function getUserById(id) {
  try {
    const { data } = await axios.get("/users/" + id);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
async function getUsersInBranch(branchName, searchUser) {
  try {
    const { data } = await axios.get("/branches/" + branchName, {
      user: searchUser,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function createUser(user) {
  try {
    const { data } = await axios.post("/users", user);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function createBranch(branch) {
  try {
    const { data } = await axios.post("/branches", {
      branchName: branch.branchName,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
async function updateUser(user) {
  try {
    const { data } = await axios.put("/users/" + user.id, user);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
async function updateBranch(newbranch) {
  try {
    const { data } = await axios.put("/branches/" + newbranch._id, {
      branchName: newbranch.branchName,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
async function deleteUser(_id) {
  try {
    const { data } = await axios.delete("/users/" + _id);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
async function deleteBranch(id) {
  try {
    const { data } = await axios.delete("/branches/" + id);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await axios.post("/uploads", form);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
}
export {
  getAllUsers,
  getAllBranches,
  getBranches,
  getUsers,
  getUserById,
  getUsersInBranch,
  createUser,
  createBranch,
  updateUser,
  updateBranch,
  deleteUser,
  deleteBranch,
};
