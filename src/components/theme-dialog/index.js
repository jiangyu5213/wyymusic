import React, { memo } from "react";

import { Modal } from "antd";

import propTypes from "prop-types";

function ThemeDialog(props) {
  const { title, isShow, handleOk, handleCancel } = props;

  return (
    <>
      <Modal
        title={title}
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
}

ThemeDialog.propTypes = {
  title: propTypes.string,
  isShow: propTypes.bool.isRequired,
};

ThemeDialog.defaultProps = {
  title: "hello dialog",
  isShow: false,
};

export default memo(ThemeDialog)
