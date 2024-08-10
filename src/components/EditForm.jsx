import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { createUser, updateUser, uploadFile } from "../utils/api";

export default function EditForm({ type, user }) {
  const profileImage = SERVER_URL + "/uploads/user-1723232043280.png";
  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [imageChanged, setImageChanged] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch } = UseUserContext();

  useEffect(() => {
    if (type === "edit") {
      if (user.image) {
        setSelectedImage(SERVER_URL + `${user.image}`);
      } else {
        setSelectedImage(profileImage);
      }
    }
  }, []);

  const listOfProvince = [
    "British Columbia",
    "Alberta",
    "Manitoba",
    "New Brunswick",
    "Nova Scotia",
    "Ontario",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      image: user ? user.image : "",
      province: user ? user.province : 1,
      branch: user ? user.branch : 1,
      description: user ? user.description : "",
    },
  });

  const imageField = { ...register("image") };
  async function handleImageSelect(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setImageChanged(true);
      const result = await uploadFile(file);
      if (result.filename) {
        setSelectedImage(SERVER_URL + "/uploads/" + result.filename);
      } else if (result.error) {
        toast.error(result.error);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }

  function handleRemoveImage() {
    setSelectedImage(profileImage);
    setValue("image", "");
  }

  async function onSubmit(data) {
    console.log(data);
    const {
      firstname,
      lastname,
      phone,
      email,
      image,
      branch,
      description,
      province,
    } = data;
    if (image?.length && imageChanged) {
      const startIndex = selectedImage.indexOf("/uploads");
      data.image = selectedImage.substring(startIndex);
    }

    if (type == "new") {
      const result = await createUser({
        firstname,
        lastname,
        phone,
        image: data.image,
        email,
        branch,
        description,
        province,
      });
      if (result.success) {
        dispatch({ type: "createNewUser", payload: result.body });
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } else {
      const {
        firstname,
        lastname,
        phone,
        email,
        province,
        description,
        image,
        branch,
      } = data;
      const result = await updateUser({
        firstname,
        lastname,
        phone,
        email,
        image,
        province,
        description,
        branch,
        id: user._id,
      });
      if (result.success) {
        dispatch({ type: "updateUser", payload: result.body });
        navigate("/user/" + user._id);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  }

  return (
    <form
      className=" w-75 m-auto my-4 bg-light px-4 py-2 rounded-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="table">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label fw-bold">Name</label>
            <input
              type="text"
              className="input"
              {...register("firstname", {
                required: "You must enter a name",
                minLength: {
                  value: 3,
                  message: "Name must be 3 Characters at least",
                },
                maxLength: {
                  value: 10,
                  message: "Name must be 10 Characters at most",
                },
              })}
            />
            {errors.name && <p className="errors">{errors.name.message}</p>}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label fw-bold">Family</label>
            <input
              type="text"
              className="input"
              {...register("lastname", {
                required: "You must enter a family",
                minLength: {
                  value: 3,
                  message: "Family must be 3 Characters at least",
                },
                maxLength: {
                  value: 10,
                  message: "Family must be 10 Characters at most",
                },
              })}
            />
            {errors.family && <p className="errors">{errors.family.message}</p>}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label fw-bold">Phone</label>
            <input
              type="number"
              className="input"
              {...register("phone", {
                required: "You must enter a Phone number",
                minLength: {
                  value: 10,
                  message: "It is short, Phone number must be 10 number",
                },
                maxLength: {
                  value: 12,
                  message: "It is long, Phone number must be 10 number",
                },
              })}
            />
            {errors.phone && <p className="errors">{errors.phone.message}</p>}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label fw-bold">Province</label>
            <select
              className="input"
              {...register("province", {
                required: "Select the province",
              })}
            >
              {listOfProvince.map((province) => (
                <option key={province} value={listOfProvince.indexOf(province)}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="errors">{errors.province.message}</p>
            )}
          </div>
        </div>
        {/*  <div className="d-flex flex-column justify-content-start align-items-start mb-4">
          <div className="d-flex  justify-content-center align-items-center">
            <label className="mb-1 label fw-bold">Address of Image</label>
            <img
              src={
                params.id
                  ? watch("avatarURL")
                  : watch("avatarURL") == "https://i.pravatar.cc/300?img="
                  ? noAvatar
                  : watch("avatarURL")
              }
              width="40"
              className="rounded-circle img"
            />
          </div>

          <input
            type="text"
            className="w-100 input"
            {...register("avatarURL", {
              required: "Select the image",
            })}
          />
          {errors.avatarURL && (
            <p className="errors">{errors.avatarURL.message}</p>
          )}
        </div> */}

        <div className=" d-flex  flex-column justify-content-center align-items-start mt-5 mb-4">
          <label className="mb-1 label fw-bold ">Photo</label>
          <div className=" d-flex flex-column flex-md-row  justify-content-between align-items-center">
            <img
              src={selectedImage}
              width={100}
              height={100}
              className=" mt-md-0 bg-transparent rounded-circle"
            />
            <div className="bg-transparent ms-5 me-4 d-flex justify-content-center align-items-center flex-column">
              <div className="">
                <input
                  {...imageField}
                  id="selectImage"
                  className="d-none inputProduct"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <label
                  className="btn-select mb-4 text-center text-white px-2 py-2 border-0 fs-5 rounded-1"
                  htmlFor="selectImage"
                >
                  Select Image
                </label>
              </div>
              <button
                type="button"
                className="btn-remove text-white px-2 py-2 border-0 fs-5 rounded-1"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          </div>
          {errors.image && (
            <p className="errors mt-3">{errors.image.message}</p>
          )}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-start mb-3">
          <label className="mb-1 label fw-bold">Branch</label>
          <select
            className="input"
            {...register("branch", {
              required: "Select the branch",
            })}
          >
            {state.branches.map((branch) => (
              <option key={branch._id} value={state.branches.indexOf[branch]}>
                {branch.branchName}
              </option>
            ))}
          </select>
          {errors.branch && <p className="errors">{errors.branch.message}</p>}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fw-bold">Email</label>
          <input
            type="text"
            className="input"
            {...register("email", {
              required: "You must enter an email",
              minLength: {
                value: 8,
                message: "Email must be 8 Characters at least",
              },
            })}
          />
          {errors.email && <p className="errors">{errors.email.message}</p>}
        </div>

        <div className="d-flex flex-column justify-content-start align-items-start mb-4">
          <label>Describe</label>
          <textarea
            className="form-control"
            type="text"
            {...register("description")}
          ></textarea>
        </div>
        <div>
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              {type == "new" ? "Create User" : "EditUser"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

//
