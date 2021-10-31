import styled from "styled-components";

export const AnchorCoverWrapper = styled.div`
  display: flex;
  height: 50px;

  .artist-image {
    margin-right: 7px;
  }

  .artist-info {
    .artist-name {
      display: block;
      position: relative;
      color: #000;

      &::after {
        position: absolute;
        top: 2px;
        content: "";
        width: 11px;
        height: 13px;
        background: url(${require("@/assets/img/sprite_icon2.png").default});
        background-position: 0 1px;
      }
    }

    .artist-detail {
      display: block;
      width: 160px;
      color: #666;
    }
  }
`;
