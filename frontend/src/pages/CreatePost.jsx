import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("You must input Post content!"),
    username: Yup.string().min(3).max(15).required("You must input a Username!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/"); 
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Recipe name: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder=""
          />
          <label>Description: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder=""
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder=""
          />

          <button type="submit">Add recipe</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;