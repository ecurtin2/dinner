import React from "react";

import * as Yup from "yup";
import {
  withFormik,
  FormikProps,
  Form,
  Field,
  ErrorMessage,
  useField,
} from "formik";
import { Recipe } from "./Types";
import { postRecipe } from "./Api";
import { SingleRecipePage } from "./Recipe";

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too long, must be < 50 characters!")
    .required("required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too long, must be < 500 characters!")
    .required("required"),
  paragraph: Yup.string()
    .min(1, "Too Short!")
    .max(500, "Too long, must be < 500 characters!")
    .required("required"),
  teaser_image_png_b64: Yup.string().required("required"),
});

const MyTextArea = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

function onAddIngredients(e: any, values: any, setValues: any) {
  const ingredients = [...values.ingredients];
  ingredients.push({ name: "", quantity: "", unit: "" });
  setValues({ ...values, ingredients });
}

function CustomFileUpload(props: any) {
  const { field, form } = props;

  const handleChange = async (e: any) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    let base64String;

    reader.onload = await function (event) {
      base64String = event.target?.result;
      form.setFieldValue(field.name, base64String);
    };
  };

  return (
    <div>
      <input
        type={"file"}
        onChange={(o) => handleChange(o)}
        className={"form-control"}
      />
    </div>
  );
}

const InnerForm = (props: FormikProps<Recipe>) => {
  const { isSubmitting, setValues, values } = props;
  const ingredients = props.values.ingredients;

  const recipePage = SingleRecipePage(props.values);
  return (
    <div>
      <div className="grid grid-cols-2 divide-x-8 divide-black-100">
        <Form className="grid grid-cols-1">
          <label htmlFor="title">Title</label>
          <Field className="w-1/2" name="title" type="text" />

          <label htmlFor="description">Description</label>
          <MyTextArea className="max-w-prose" name="description" rows="3" />

          <label htmlFor="ingredients">Ingredients</label>
          {ingredients.map((val, idx) => {
            return (
              <div key={idx} className="p-2">
                <Field
                  placeholder="ingredient"
                  name={`ingredients[${idx}].name`}
                  type="text"
                />
                <Field
                  placeholder="quantity"
                  name={`ingredients[${idx}].quantity`}
                  type="text"
                />
                <Field
                  placeholder="unit"
                  name={`ingredients[${idx}].unit`}
                  type="text"
                />
              </div>
            );
          })}
          <button
            type="button"
            onClick={(e) => onAddIngredients(e, values, setValues)}
            disabled={isSubmitting}
            className="w-1/12 bg-blue-500 rounded-xl font-bold p-1 text-white"
          >
            +
          </button>

          <label htmlFor="paragraph">Instructions</label>
          <MyTextArea className="max-w-prose h-48" name="paragraph" rows="10" />

          <label htmlFor="teaser_image_png_b64">Teaser Image</label>
          <Field
            id="teaser_image_png_b64"
            name="teaser_image_png_b64"
            component={CustomFileUpload}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="justify-self-center w-1/12 bg-blue-500 rounded-xl font-bold p-1 text-white"
          >
            Submit
          </button>
        </Form>
        <div>{recipePage}</div>
      </div>
    </div>
  );
};

// Left this here in case i need it later
// don't really know what im doing lmao
interface MyFormProps {}

const SubmitPage = withFormik<MyFormProps, Recipe>({
  mapPropsToValues: (props) => {
    return {
      id: "",
      title: "",
      description: "",
      paragraph: "",
      teaser_image_png_b64: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAdQAAAA8BAMAAAAtaVYEAAAAG1BMVEXMzMyWlpacnJzFxcWqqqqjo6O3t7exsbG+vr6io6CQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACh0lEQVRoge2WwVPaQBSHfyEQc1yygByTNep1ae09xtLpkUSY8QjT8a7O2F5Da6f/dt++gLUw9NRKtO87IP4evNlv3rIbQBAEQRAEQRAEQRAEQRAEQRAE4TWTdLtdvaPmq13fCovjaiv0LDD6S8v6F4xn/dlkR2236iIqDrfCpqsCu2b6B1W/b3FbbaavUvUgBjrZZvoiVIPiBDhLLuHnqcV1NId3FjtV78F8K1xMYwySC8U1oEUvfkW/2EtwcmYu8KjqAp3XPRsGqS6mxRz5F4NOmk+C/ngA73zCqum1+VyifXoXYzk9VlyrpYhlaiwn5ftjlxpjEnDQ69c9GwapHroteYKRHVlfeze4g3cEVs38Q4pbc19jipbiGs+uNDHGaN24hIojkvfoMO+CPxLZumfD0AgjYzQqpzqnWdFsrEdvnGqFIc0wBNloBIprcGJJV1EpmLjk7YAb1RuYPzJY9WwYpEDToGWXXduOPmJB/1W8RUnVUplerhNNZ1SouFZLhepXcp5SuFLlYN2zYdBUeU3nH2hYP4psWWH1a3xUbfc+aZprqLhWH0tBrcpJeN/D41SrJz0bhoZP+y3znVOAUNMmfthQHbk/NHfFtdVlU29gTuZY2rUqB6ue+xXbhn5RM3RiUr21XuXrzgTlluqBpkOoo7hGBRrireJjiZNhfSyxKgernns220K7WyOpYO7LrNPLJ2GUDzdUW6ezlC4bo7hGLPrlQPFlw0lRXzasysG6Z8PQ7umdrvuvafvIL+kR4rt7hPhNNTRZbsPiSnEN7gv9Kq4fIVzy7ukjhAvWPV8oFYJ432t4JqZ4k+17Dc/EInJX6n/BQXK17yUIgiAIgiAIgiAIL4Gf3bhxw5vF4B4AAAAASUVORK5CYII=",
      ingredients: [{ name: "", quantity: 0, unit: "" }],
    };
  },
  validationSchema: FormSchema,
  handleSubmit: (values) => {
    postRecipe(values);
  },
})(InnerForm);

export default SubmitPage;
