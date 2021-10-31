import styled from "styled-components";

export const SingerCoverWrapper = styled.a`
  display: flex;
  margin-top: 14px;
  width: 210px;
  height: 62px;
  background: #fafafa;

  &:hover {
    text-decoration: none;
  }

  .singer-title {
    width: 100%;
    height: 100%;
    padding: 4px 9px;
    border: 1px solid #e9e9e9;
    border-left: none;

    .singer-name {
      font-weight: bold;
      font-size: 14px;
      color: #333;
      margin-bottom: 8px;
    }
  }
`;
