import Logo from "@/assets/icons/Logo";
import BgImage from "../assets/images/bg-image.png";
import { Link } from "react-router";
import React, { useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [singIn] = useLoginMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async(e)=>{
    e.preventDefault()
    const payload ={
      email: login.email,
      password: login.password
    }
    console.log("payload",payload)
    const res = await singIn(payload).unwrap()
    console.log("res",res)
    if(res){
      toast.success("Login successfully")
    }
  }
  
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className="bg-card p-8 rounded-2xl shadow-xl w-96">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="text-xl font-bold text-center text-foreground mb-6">
          Welcome Newsx, Please Log In
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            name="email"
            onChange={handleChange}
            value={login.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            name="password"
            onChange={handleChange}
            value={login.password}
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Go to Home Page?{" "}
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
