import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import noAvatar from "../assets/image/no-avatar.png";
import { UseUserContext } from "../context/AppContext";

export default function EditForm({ onSubmit, type, user }) {
  const [selectedImage, setSelectedImage] = useState(noAvatar);
  const [imageChanged, setImageChanged] = useState(false);
  const params = useParams();

  const { state, dispatch } = UseUserContext();
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

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      province: user ? user.province : 1,
      branch: user ? user.branch : 1,
      description: user ? user.description : "",
    },
  });
  const { errors, isSubmitting } = formState;

  // const imageField = { ...register("image") };
  function handleImageSelect(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    console.log(file);
    setImageChanged(true);
    setSelectedImage(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setSelectedImage(noAvatar);
    setValue("image", "");
  }

  return (
    <form
      className=" w-75 m-auto mt-3 bg-light px-4 py-2 rounded-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="table">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Name</label>
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
            <label className="mb-1 label">Family</label>
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
            <label className="mb-1 label">Phone</label>
            <input
              type="text"
              className="input"
              {...register("phone", {
                required: "You must enter a Phone number",
                minLength: {
                  value: 12,
                  message: "It is short, Phone number must be 12 number",
                },
                maxLength: {
                  value: 12,
                  message: "It is long, Phone number must be 12 number",
                },
              })}
            />
            {errors.phone && <p className="errors">{errors.phone.message}</p>}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Province</label>
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
            <label className="mb-1 label">Address of Image</label>
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
        {/* <div className="d-flex  flex-column justify-content-center align-items-start mt-5 mb-4">
          <label className="mb-1 label ">Photo</label>
          <div className=" d-flex flex-column flex-md-row  justify-content-between align-items-center">
            <div className="me-4 d-flex justify-content-center align-items-center flex-column">
              <div>
                <input
                  {...imageField}
                  id="selectImage"
                  className="d-none inputProduct"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <label
                  className="btn-select mt-5 mb-4 text-center text-white px-2 py-2 border-0 fs-5 rounded-1"
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
            <img
              src={selectedImage}
              width={200}
              height={200}
              className="mt-5 mt-md-0"
            />
          </div>
          {errors.image && (
            <p className="errors mt-3">{errors.image.message}</p>
          )}
        </div> */}
        <div className="d-flex flex-column justify-content-center align-items-start mb-3">
          <label className="mb-1 label">Branch</label>
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
        <div className="d-flex flex-column justify-content-center align-items-start ">
          <label className="mb-1 label">Email</label>
          <input
            type="text"
            className="input"
            {...register("email", {
              required: "You must enter an email",
              minLength: {
                value: 3,
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
