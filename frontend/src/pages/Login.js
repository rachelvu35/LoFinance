import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        'lofi-user',
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login Successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("lofi-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>LOGIN</h1>
            <hr />
            
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Registered Yet, Click Here To Register
              </Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            <dotlottie-player
              src="https://lottie.host/34900ac0-d852-4d3c-a250-3d8d3e47aa27/6WJklhUYAX.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
