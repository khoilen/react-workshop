import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import CheckBox from "../../components/check-box";
import Input from "../../components/input";

import { useLoginMutation } from "../../hooks/use-login-mutation";

import { ADMIN_URL } from "../../constant/url";
import { TOKEN } from "../../constant/auth";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutateAsync: login, isPending, error } = useLoginMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });

      const { accessToken } = response.data;
      localStorage.setItem(TOKEN, accessToken);
      return navigate(ADMIN_URL.DASHBOARD);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="User name"
            required
            placeholder="Enter your username"
            error={errors.username?.message}
            {...register("username", {
              required: "Username is required",
            })}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />
        </div>
        <div className="my-4">
          <CheckBox label="Remember me" {...register("remember")} />
        </div>
        {error && (
          <small className="text-red-600 my-4 block">{error.message}</small>
        )}
        <Button isLoading={isPending} disabled={isPending}>
          Login
        </Button>
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
