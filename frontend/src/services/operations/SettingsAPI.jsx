import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const currentUser = getState()?.profile?.user || {};
      const updatedUserDetails = response.data.userDetails || response.data.updatedUserDetails || {};
      const profileDetails =
        updatedUserDetails.additionalDetails || updatedUserDetails || {};
      const nextUser = {
        ...currentUser,
        ...updatedUserDetails,
        firstName:
          updatedUserDetails.firstName ||
          updatedUserDetails.firstname ||
          formData.firstName ||
          currentUser.firstName ||
          currentUser.firstname,
        lastName:
          updatedUserDetails.lastName ||
          updatedUserDetails.lastname ||
          formData.lastName ||
          currentUser.lastName ||
          currentUser.lastname,
        additionalDetails: {
          ...(currentUser.additionalDetails || {}),
          ...profileDetails,
          dateOfBirth:
            profileDetails.dateOfBirth ||
            formData.dateOfBirth ||
            currentUser.additionalDetails?.dateOfBirth,
          about:
            profileDetails.about ||
            formData.about ||
            currentUser.additionalDetails?.about,
          gender:
            profileDetails.gender ||
            formData.gender ||
            currentUser.additionalDetails?.gender,
          contactNumber:
            profileDetails.contactNumber ||
            formData.contactNumber ||
            currentUser.additionalDetails?.contactNumber,
        },
      };
      dispatch(setUser(nextUser));
      localStorage.setItem("user", JSON.stringify(nextUser));
      toast.success("Profile Updated Successfully");
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Could Not Update Profile";
      toast.error(errorMessage);
      toast.dismiss(toastId);
      return false;
    }
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}