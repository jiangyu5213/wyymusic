import styled from "styled-components";

export const RecNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 33px;
  padding: 0 10px 0 0;
  padding-left: ${(props) => (props.showIcon ? "34px" : "2px")};
  border-bottom: 2px solid #c10d0c;
  background: ${(props) => {
    const url =
      "url(" +
      require("@/assets/img/sprite_02.png").default +
      ") no-repeat center";
    return props.showIcon ? url : "";
  }};
  background-position: -225px -156px;
  line-height: 33px;
`;

export const RecNavbarLeft = styled.div`
  display: flex;
  .hot-title {
    display: flex;
    margin-bottom: 5px;
    a {
      color: #333333;
      &:hover {
        text-decoration: none;
      }
    }
  }

  .keywords {
    display: flex;
    margin-left: 20px;
    color: #ccc;
    line-height: 35px;
    .item {
      .line {
        margin: 0 10px;
      }
    }
  }
`;

export const RecNavbarRight = styled.div`
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    vertical-align: middle;
    background: transparent
      url("${require("@/assets/img/sprite_02.png").default}") no-repeat center;
    background-position: 0 -240px;
  }
`;
