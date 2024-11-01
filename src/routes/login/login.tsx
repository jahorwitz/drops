import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import backbutton from "../../images/Backbutton.svg";
import { Button, Form } from "../../components";

export const Login: React.FC = () => {
  interface MyFormValues {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyFormValues>();

  const onSubmit = (data: MyFormValues) => {
    console.log("submitting");
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col bg-lightYellow overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <div className="z-10 mt-12 ml-5">
        <Link to="/">
          <img src={backbutton} />
        </Link>
      </div>
      <img
        src={logo}
        alt="Drop Logo"
        className="w-20 h-[112.27px]  mx-auto z-1 mt-3"
      />
      <h2 className="font-text text-section-header font-medium mt-16 leading-[52.8px] text-center max-w-[358px] mx-auto">
        Log In
      </h2>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[390px] w-full px-4  mt-8 h-full  max-h-[502px] self-center"
      >
        <div className="flex flex-col h-full gap-5">
          <Form.TextInput
            labelText="Email"
            placeholder="Enter your email"
            feedback={errors.email?.message}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          <Form.TextInput
            labelText="Password"
            placeholder="Enter your password"
            type="password"
            feedback={errors.password?.message}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button
            type="submit"
            buttonText="Log In"
            variant="primary"
            disabled={!isValid}
            className={`h-[60px] w-full ${
              !isValid ? "pointer-events-none opacity-20" : ""
            }`}
          ></Button>
          <Link to="/register">
            <Button
              type="button"
              buttonText="Or register"
              variant="text"
              disabled={!isValid}
              className="opacity-100 hover:opacity-80 mt-8 p-0 rounded-lg"
            ></Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};
