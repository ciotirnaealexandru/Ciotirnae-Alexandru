import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/register", data)
      .then((response) => {
        console.log("Registration successful:", response.data);
      })
      .catch((error) => {
        console.error("Registration failed:", error.response.data);
      });
  };
  

  return (
    <div className="registration">Hai, fă foamea cu noi!
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder=""
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder=""
          />

          <button type="submit"> Sign up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;