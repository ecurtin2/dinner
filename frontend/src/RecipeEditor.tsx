import React from "react";

import {
  FormikProps,
  Form,
  Field,
  useField,
  Formik,
} from "formik";
import { Recipe } from "./messages/recipe";
import { postRecipe, getRecipe } from "./Api";
import { SingleRecipePage } from "./Recipe";
import { useParams } from "react-router-dom";


const MyTextArea = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
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

type FieldLabelProps = {
  name: string;
}

function FieldLabel(props: FieldLabelProps) {
  return <label htmlFor={props.name} className="pt-4 pb-2 max-h-12">{props.name}</label>
}

type InlineFieldProps = {
  name: string,
  placeholder: string
}

function InlineField(props: InlineFieldProps) {
  return (<Field
    placeholder={props.placeholder}
    name={props.name}
    type="text"
    className="p-2 m-2"
  />)
}

const InnerForm = (props: FormikProps<Recipe>) => {
  const { isSubmitting, setValues, values } = props;
  const ingredients = props.values.ingredients;
  const recipePage = SingleRecipePage(props.values);
  return (
    <div className="pb-10">
      <div className="grid grid-cols-2">

        <Form className="grid grid-cols-1 pl-10 pr-20">
          <div className="text-primary font-semibold">
            Recipe Unique ID: {props.values.id ? props.values.id : 'To be Determined'}
          </div>
          <FieldLabel name="Title" />
          <Field className="w-1/2" name="title" type="text" />

          <FieldLabel name="Teaser Image" />
          <Field
            id="teaserImage"
            name="teaserImage"
            component={CustomFileUpload}
          />


          <FieldLabel name="Description" />
          <MyTextArea className="p-4" name="description" rows="5" />

          <FieldLabel name="Ingredients" />
          {ingredients.map((val, idx) => {
            return (
              <div key={idx} className="">
                <InlineField placeholder="ingredient" name={`ingredients[${idx}].name`} />
                <InlineField placeholder="quantity" name={`ingredients[${idx}].quantity`} />
                <InlineField placeholder="unit" name={`ingredients[${idx}].unit`} />
              </div>
            );
          })}
          <button
            type="button"
            onClick={(e) => onAddIngredients(e, values, setValues)}
            disabled={isSubmitting}
            className="w-8 bg-primary rounded-xl font-bold p-1 text-white max-h-8"
          >
            +
          </button>

          <FieldLabel name="Instructions" />
          <MyTextArea className="p-4" name="instructions" rows="10" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="justify-self-center bg-primary rounded-xl font-bold p-2 text-white"
          >
            Submit
          </button>
        </Form>
        <div>{recipePage}</div>
      </div>
    </div>
  );
};

export function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe_to_render, set_recipe] = React.useState<Recipe>({
    id: "",
    title: "My Recipe",
    description: "Write a short description here...",
    instructions: "Describe step-by-step process here...",
    teaserImage: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAdQAAAA8BAMAAAAtaVYEAAAAG1BMVEXMzMyWlpacnJzFxcWqqqqjo6O3t7exsbG+vr6io6CQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACh0lEQVRoge2WwVPaQBSHfyEQc1yygByTNep1ae09xtLpkUSY8QjT8a7O2F5Da6f/dt++gLUw9NRKtO87IP4evNlv3rIbQBAEQRAEQRAEQRAEQRAEQRAE4TWTdLtdvaPmq13fCovjaiv0LDD6S8v6F4xn/dlkR2236iIqDrfCpqsCu2b6B1W/b3FbbaavUvUgBjrZZvoiVIPiBDhLLuHnqcV1NId3FjtV78F8K1xMYwySC8U1oEUvfkW/2EtwcmYu8KjqAp3XPRsGqS6mxRz5F4NOmk+C/ngA73zCqum1+VyifXoXYzk9VlyrpYhlaiwn5ftjlxpjEnDQ69c9GwapHroteYKRHVlfeze4g3cEVs38Q4pbc19jipbiGs+uNDHGaN24hIojkvfoMO+CPxLZumfD0AgjYzQqpzqnWdFsrEdvnGqFIc0wBNloBIprcGJJV1EpmLjk7YAb1RuYPzJY9WwYpEDToGWXXduOPmJB/1W8RUnVUplerhNNZ1SouFZLhepXcp5SuFLlYN2zYdBUeU3nH2hYP4psWWH1a3xUbfc+aZprqLhWH0tBrcpJeN/D41SrJz0bhoZP+y3znVOAUNMmfthQHbk/NHfFtdVlU29gTuZY2rUqB6ue+xXbhn5RM3RiUr21XuXrzgTlluqBpkOoo7hGBRrireJjiZNhfSyxKgernns220K7WyOpYO7LrNPLJ2GUDzdUW6ezlC4bo7hGLPrlQPFlw0lRXzasysG6Z8PQ7umdrvuvafvIL+kR4rt7hPhNNTRZbsPiSnEN7gv9Kq4fIVzy7ukjhAvWPV8oFYJ432t4JqZ4k+17Dc/EInJX6n/BQXK17yUIgiAIgiAIgiAIL4Gf3bhxw5vF4B4AAAAASUVORK5CYII=",
    ingredients: [{ name: "ingredient1", quantity: 1, unit: "" }],
    embedding: {salt: 1.0, fat: 1.0, acid: 1.0, heat: 1.0, umami: 1.0}
  });
  React.useEffect( () => {
          const getmyrecipe = async () => {
              await getRecipe(id).then((r) => {
                if (typeof(r) === "undefined") {
                } else {  
                  set_recipe(r)
                }
              });
          };
          getmyrecipe();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
  );

  return <Formik enableReinitialize={true} initialValues={recipe_to_render} onSubmit={(values) => { postRecipe(values); }}>
    {InnerForm}
  </Formik>
}
