import React, { useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { contactUsApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [contactUs, setContactUs]: any = useState();
  const [loading, setLoading]: any = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message should be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);
    contactUsApi({
      body: {
        full_name: values.fullName,
        email: values.email,
        message: values.message,
      },
    })
      .then((res: any) => {
        toast.success(res.msg);
        resetForm();
        navigate("/");
      })
      .catch((err: any) => console.log("err", err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="contactUs">
      {loading && <FullScreenLoader />}
      <div className="flex h-100">
        <Sidebar current={"Contact Us"} />
        <div className="main-area">
          <div className="body-area">
            <div className="common-back">
              <h3>Contact Us</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group flex space-bw">
                      <div className="col-50">
                        <label htmlFor="fullName">Full Name</label>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="email">Email</label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Enter your message"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <div className="col-33 btn">
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
