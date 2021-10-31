import React from "react";

// redux
import { useDispatch } from "react-redux";
import { getLoginProfileInfo } from "../login/store/actionCreator";

import { Form, Input, Button, Checkbox, message } from "antd";

import { sendRegister } from "@/api/api/user";
// import { getParseLoginState, getMatchReg } from "@/utils/format-utils";

import loginFormStyle from "./style.module.css";

import propTypes from "prop-types";

/* 登录和注册的表单组件 */
const ThemeLoginForm = (props) => {
  const { loginState } = props;

  const dispatch = useDispatch();

  // 表单正则
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordReg = /[0-9a-zA-Z._-]{6,20}/;

  // 提交表单（登录）时触发
  const onFinish = ({ username, password }) => {
    dispatch(getLoginProfileInfo(username, password, true));
  };
  // 提交表单（登录）失败时触发
  const onFinishFailed = errorInfo => {
    console.log("❕Failed:", errorInfo);
  };

  // 提交表单（注册账号）时触发
  const onRegisterFinish = value => {
    const { email, password, nickname } = value;
    sendRegister(email, password, nickname).then((res) => {
      if (res.status === 200) message.success("注册成功");
      else message.warn(res.message);
    });
  };

  // 提交表单（注册账号）失败时触发
  const onRegisterFinishFailed = errorInfo => {
    console.log("❕Failed:", errorInfo);
  };

  // 发送验证码
  /*   const handleSendCode = () => {
    if (!isSendSatte) {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setSecond(second - i);
        if (i >= 60) {
          clearInterval(timer);
          setIsSendSatte(false);
          setSecond(60);
        }
      }, 1000);
      // 发送验证码
      !isSendSatte &&
        sendRegisterCode(phoneNumber).then((res) => {
          if (res.code === 200) message.success("发送成功");
          else message.warn("发送失败，请60秒后发送验证码");
        });
    }
    setIsSendSatte(true);
  }; */

  return (
    <>
      {/* 登录页 */}
      <Form
        style={{
          display: loginState !== "register" ? "block" : "none",
        }}
        labelCol={{ span: 6 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* 输入邮箱 */}
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              patten: emailReg,
              message: `请输入正确的邮箱`,
            },
            {
              required: true,
              message: "请输入你的邮箱",
            },
          ]}
        >
          <Input autoFocus />
        </Form.Item>

        {/* 输入密码 */}
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              pattern: passwordReg,
              message: "密码6~20位",
            },
            {
              required: true,
              message: "请输入你的密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* 选择是否自动登录 */}
        <div className={loginFormStyle.textAlignRight}>
          <Checkbox className={loginFormStyle.mar80} defaultChecked={true}>
            自动登录
          </Checkbox>
          <span className={loginFormStyle.forgetPassword}>忘记密码？</span>
        </div>

        {/* 登录按钮 */}
        <Form.Item>
          <Button
            type="primary"
            size="middle"
            shape="round"
            htmlType="submit"
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      {/* 注册页 */}
      <Form
        name="basic"
        style={{
          display: loginState === "register" ? "block" : "none",
        }}
        labelCol={{ span: 6 }}
        onFinish={onRegisterFinish}
        onFinishFailed={onRegisterFinishFailed}
      >
        {/* 输入邮箱 */}
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              patten: emailReg,
              message: `请输入正确的邮箱`,
            },
            {
              required: true,
              message: "请输入你的邮箱",
            },
          ]}
        >
          <Input autoFocus />
        </Form.Item>

        {/* 输入密码 */}
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { pattern: passwordReg, message: "密码6~20位", required: true },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* 输入昵称 */}
        <Form.Item
          // className={loginFormStyle.gap}
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: "请输入你的昵称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            block
            size="middle"
            type="primary"
            shape="round"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

ThemeLoginForm.propTypes = {
  loginState: propTypes.string,
};

export default ThemeLoginForm;
