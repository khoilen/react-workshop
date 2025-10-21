import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import CheckBox from "../../components/check-box";
import Input from "../../components/input";

import { useLogin } from "../../hooks/use-login";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = (data: LoginForm) => {
    setErrorMessage(null);
    login({ username: data.username, password: data.password })
      .then((response) => {
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        return navigate("/admin");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="User name"
            required
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username?.message && (
            <small className="text-red-600">{errors.username.message}</small>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password?.message && (
            <small className="text-red-600">{errors.password.message}</small>
          )}
        </div>
        <div className="my-4">
          <CheckBox label="Remember me" {...register("remember")} />
        </div>
        {errorMessage && (
          <small className="text-red-600 my-4 block">{errorMessage}</small>
        )}
        <Button isLoading={isPending}>Login</Button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <a href="#" className="ml-2 text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;
