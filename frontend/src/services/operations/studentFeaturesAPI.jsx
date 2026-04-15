import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ""));

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

function openCheckout({ key, amount, userName, userEmail, description, onSuccess }) {
    const paymentObject = new window.Razorpay({
        key,
        currency: "INR",
        amount: `${amount}`,
        name: "StudyNotion",
        description,
        image: rzpLogo,
        prefill: {
            name: userName,
            email: userEmail || "",
        },
        handler: onSuccess,
    });

    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
        toast.error("Payment failed");
        console.log(response.error);
    });
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch, courseList = []) {
    const toastId = toast.loading("Loading...");
    try{
        const validCourses = (courses || []).filter((id) => isMongoObjectId(id));

        const userName = `${userDetails?.firstName || userDetails?.firstname || "Student"} ${
            userDetails?.lastName || userDetails?.lastname || ""
        }`.trim();

        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

        if(!razorpayKey) {
            toast.error("Razorpay key is missing. Set VITE_RAZORPAY_KEY in frontend/.env");
            return;
        }

        if(validCourses.length === 0) {
            const demoAmount = Math.max(
                1,
                (courseList || []).reduce((acc, curr) => acc + Number(curr?.price || 0), 0)
            );

            openCheckout({
                key: razorpayKey,
                amount: demoAmount * 100,
                userName,
                userEmail: userDetails?.email,
                description: "Demo checkout for selected courses",
                onSuccess: () => toast.success("Payment option opened successfully"),
            });
            return;
        }

        if(validCourses.length !== courses.length) {
            toast.error("Some demo courses were removed from checkout");
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses: validCourses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        const orderData = orderResponse.data.data;
        const orderKey = orderResponse.data.key || razorpayKey;

        openCheckout({
            key: orderKey,
            amount: orderData.amount,
            userName,
            userEmail: userDetails?.email,
            description: "Thank You for Purchasing the Course",
            onSuccess: function(response) {
                sendPaymentSuccessEmail(response, orderData.amount,token );
                verifyPayment({...response, courses: validCourses}, token, navigate, dispatch);
            },
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}