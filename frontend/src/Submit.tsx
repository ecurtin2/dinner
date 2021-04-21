import React from "react";

import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Recipe } from "./Recipe";

type Ingredient = {
    name: string;
}

const FormSchema = Yup.object().shape({
    title: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too long, must be < 50 characters!')
     .required('required'),
    description: Yup.string()
     .min(2, 'Too Short!')
     .max(500, 'Too long, must be < 500 characters!')
     .required('required'),
    paragraph: Yup.string()
     .min(1, 'Too Short!')
     .max(500, 'Too long, must be < 500 characters!')
     .required('required'),
    teaser_image_png_b64: Yup.string()
     .min(1, 'Too Short!')
     .max(500, 'Too long, must be < 500 characters!')
     .required('required'),
});


function onAddIngredients(e: any, values: any, setValues: any) {
    const ingredients = [...values.ingredients];
    ingredients.push({ name: '', quantity: '', unit: '' });
    setValues({ ...values, ingredients });
}

const InnerForm = (props:  FormikProps<Recipe>) => {
  const { touched, errors, isSubmitting, setValues, values } = props;

  console.log(props)
  const ingredients = props.values.ingredients;
  console.log(ingredients)
  return (
    <Form className="grid grid-cols-1">

         <label htmlFor="title">Title</label>
         <Field name="title" type="text" />
         <div className="text-red-500 h-6">
            <ErrorMessage name="title"/>
         </div>

         <label htmlFor="description">Description</label>
         <Field name="description" type="text" />
         <div className="text-red-500 h-6">
            <ErrorMessage name="description"/>
         </div>

         {
            ingredients.map((val, idx) => {
                return (
                <div key={idx} className="p-2">
                    <Field placeholder="ingredient" name={`ingredients[${idx}].name`} type="text" />
                    <Field placeholder="quantity" name={`ingredients[${idx}].quantity`} type="text" />
                    <Field placeholder="unit" name={`ingredients[${idx}].unit`} type="text" />
                </div>
                )
            })
         }

         <button type="button" onClick={e => onAddIngredients(e, values, setValues)} disabled={isSubmitting} className="w-1/6 bg-blue-500 rounded-xl font-bold p-1 text-white">
            Add Ingredient
         </button>

         <label htmlFor="paragraph">Instructions</label>
         <Field name="paragraph" type="text" />
         <div className="text-red-500 h-6">
            <ErrorMessage name="paragraph"/>
         </div>

         <label htmlFor="teaser_image_png_b64">Teaser Image</label>
         <Field name="teaser_image_png_b64" type="text" />
         <div className="text-red-500 h-6">
            <ErrorMessage name="teaser_image_png_b64"/>
         </div>

      <button type="submit" disabled={isSubmitting} className="justify-self-center w-1/12 bg-blue-500 rounded-xl font-bold p-1 text-white">
        Submit
      </button>
    </Form>
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
      teaser_image_png_b64: "",
      ingredients: []
    };
  },
  validationSchema: FormSchema,
  handleSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
})(InnerForm);

export default SubmitPage;
