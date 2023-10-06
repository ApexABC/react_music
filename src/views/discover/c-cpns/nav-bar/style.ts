import styled from 'styled-components'

export const NavBarWrapper = styled.div`
  .top {
    height: 30px;
    background-color: #c20c0c;
  }

  .nav {
    display: flex;
    padding-left: 240px;
    position: relative;
    top: -4px;

    .item {
      a {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 13px;
        margin: 7px 17px 0;
        color: #fff;
        font-size: 12px;

        &:hover,
        &.active {
          text-decoration: none;
          background-color: #9b0909;
          border-radius: 20px;
        }
      }
    }
  }
`
