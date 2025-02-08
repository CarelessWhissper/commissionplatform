"use client";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { Button, Input, Form, message, Spin } from "antd";
import styled from "styled-components";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await dispatch(loginUser(email, password));
      setTimeout(() => router.push("/admin"), 2000);
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Comp>
      <h2>Login</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading} block>
            {loading ? <Spin size="small" /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </Comp>
  );
}
export const Comp = styled.div`
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  text-align: center;
`;
