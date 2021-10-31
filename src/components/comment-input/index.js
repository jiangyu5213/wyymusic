import React, { memo, useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

import { Comment, Avatar, Form, Button, Input, message } from "antd";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, onFocus }) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        onFocus={(e) => onFocus(e)}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        评论
      </Button>
    </Form.Item>
  </>
);

function CommentInput(props) {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const avatar = props.photo
    ? props.photo
    : "https://gitee.com/xmkm/cloudPic/raw/master/img/default_avatar.jpg";

  const { isLogin } = useSelector(
    (state) => ({
      isLogin: state.getIn(["loginState", "isLogin"]),
    }),
    shallowEqual
  );

  const handleSubmit = () => {
    if (!value) {
      message.warning("请输入评论内容");
      return;
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = (e) => {
    !isLogin && e.target.blur();
  };

  return (
    <>
      <Comment
        avatar={<Avatar src={avatar} alt="avatar" />}
        content={
          <Editor
            value={value}
            submitting={isSubmitting}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        }
      />
    </>
  );
}

export default memo(CommentInput);
