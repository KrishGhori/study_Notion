import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-2 sm:px-4">
      <h1 className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl">Get in Touch</h1>
      <p className="mt-3 text-center text-sm text-richblack-300 sm:text-base">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mx-auto mt-8 sm:mt-10 md:mt-12">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;