import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)
        console.log("Response data:", response.data)

        if (!response?.data?.success) {
          console.log("API returned success: false")
          throw new Error(response?.data?.message || "OTP request failed")
      }

      toast.dismiss(toastId)
      toast.success(response.data.message || "OTP sent successfully")
      return true
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.dismiss(toastId)
      
      let errorMessage = "Could not send OTP"
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      console.log("Final error message:", errorMessage)
      console.error("Full error object:", error)
      
      toast.error(errorMessage, { duration: 4000 })
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export function signUp(
  accountType,
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const payload = {
        accountType,
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        otp,
      }
      console.log("SignUp API - Sending payload:", payload)
      const response = await apiConnector("POST", SIGNUP_API, payload)

      console.log("SIGNUP API RESPONSE............", response)

        console.log("Response data:", response.data)

        if (!response?.data?.success) {
          console.log("API returned success: false")
          throw new Error(response?.data?.message || "Signup failed")
      }
      toast.dismiss(toastId)
      toast.success(response.data.message || "Account created successfully!")
      // Wait a moment before navigating so user sees the success message
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.dismiss(toastId)
      
      let errorMessage = "Signup failed"
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      console.log("Final error message:", errorMessage)
      console.error("Full error object:", error)
      
      toast.error(errorMessage, { duration: 4000 })
      // Do NOT navigate on error - let user see the message and try again
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

        console.log("Response data:", response.data)

        if (!response?.data?.success) {
          console.log("API returned success: false")
          throw new Error(response?.data?.message || "Login failed")
      }
      toast.dismiss(toastId)
      toast.success(response.data.message || "Login successful!")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      // Wait a moment before navigating so user sees the success message
      setTimeout(() => {
        navigate("/dashboard/my-profile")
      }, 1500)
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.dismiss(toastId)
      
      let errorMessage = "Login failed"
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      console.log("Final error message:", errorMessage)
      console.error("Full error object:", error)
      
      toast.error(errorMessage, { duration: 4000 })
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}