import React, { memo, useRef, useState } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeIsVisible } from "./store/actionCreator";

// import Draggable from "react-draggable";
import { Button, Modal } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import LoginForm from "../login-form"; // 导入其他模块

import { LoginLeft, LoginRight, LoginWrapper, LoginModal } from "./style";

/* 登录页（模态框） */
function ThemeLogin() {
  const [disabled, setDisabled] = useState(true); // 是否禁用模态框的拖拽操作
  const [loginState, setLoginState] = useState("default"); // 登录状态 ["default", "login", "register"]
/*   const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  }); // 模态框边框位置 */

  // 引用模态框
//   const draggleRef = useRef();

  const dispatch = useDispatch();

  const { isVisible } = useSelector(
    (state) => ({
      isVisible: state.getIn(["loginState", "isVisible"]),
    }),
    shallowEqual
  );

  // 关闭模态框
  const handleCancel = (e) => {
    dispatch(changeIsVisible(false)); // 设置模态框为不可见
    // 延迟返回初始化状态
    setTimeout(() => {
      setLoginState("default");
    }, 100);
  };

/*   // 开始拖拽模态框
  const onStart = (event, uiData) => {
    console.log("👉 拖拽");
    const { clientWidth, clientHeight } = document.documentElement;
    const targetRect = draggleRef.current.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  }; */

  // 注册和登录按钮
  const defaultWrapperContent = (
    <LoginWrapper>
      <LoginLeft>
        <div className="login-content">
          {/* <div className="login-bg"></div> */}
          <Button
            className="register"
            type="ghost"
            shape="round"
            icon={<PhoneOutlined />}
            onClick={() => setLoginState("register")}
          >
            注册
          </Button>

          <Button
            className="login"
            type="primary"
            shape="round"
            icon={<PhoneOutlined />}
            onClick={() => setLoginState("login")}
          >
            登录
          </Button>
        </div>
      </LoginLeft>

    </LoginWrapper>
  );

  const emailLogin = (loginState) => {
    return (
      <LoginModal>
        <LoginForm loginState={loginState} />
      </LoginModal>
    );
  };

  return (
    // <Draggable>
      <Modal
        centered
        footer={null}
        visible={isVisible}
        onCancel={handleCancel}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            {loginState === "register" ? "注册" : "登录"}
          </div>
        }
/*         modalRender={(modal) => {
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>;
        }} */
      >
        {loginState === "default" ? defaultWrapperContent : null}
        {loginState === "login" ? emailLogin("login") : undefined}
        {loginState === "register" ? emailLogin("register") : undefined}
      </Modal>
    // </Draggable>
  );
}

export default memo(ThemeLogin);
