import styled from "styled-components";
import { NavLink } from "react-router-dom";

// App.jsx에서 쓰이는 스타일
//젤 처음 콘테이너 : 기본 바탕 패딩 주기
export const Align = styled.div`
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
`;
export const Container = styled.div`
  padding: 20px 40px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1600px;
  h1 {
    margin: 0 0 10px 0;
  }
`;
export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

export const Deps = styled.div`
  display: flex;
`;
export const desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 5px;
  padding-left: 15px;
`;

////Title_Home에서 쓰이는 스타일 (로고)
export const Logo = styled.img`
  width: 150px;
  height: auto;
  margin: 0px 0 0px 0;
  margin-left: auto;
  margin-right: auto;
  padding: 0 8px;
`;

//PhotoAlbum.jsx에서 쓰이는 스타일
export const Album = styled.div`
  padding: 20px;
  text-align: center;

  #title_bar {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 10px;
    padding: 1em 1.5em;
    h2 {
      color: #000;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin: 0;
    }
  }
  #album_content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px;
  }
  .example {
    width: 406px;
    height: 238px;
    flex-shrink: 0;
    background: #d9d9d9;
  }
  #photo_warpper {
    display: flex;
    gap: 10px;
  }
`;

export const Iner_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Blink = styled(NavLink)`
  display: flex;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  padding: 0.3em;
  color: black;

  &:hover {
    /* background-color: #ffd966; */
  }

  &.active {
    /* background-color: #FAB400; */
  }
`;

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
  font-size: 20px;

  #Head_Left {
    display: flex;
    width: 225px;
    justify-content: space-between;
    padding-top: 10px;
    /* font-size: 26px; */
  }

  #Head_Right {
    display: flex;
    width: 225px;
    padding-top: 10px;
    justify-content: flex-end;
    font-size: 18px;
    color: #6D6D6D;
  }
`;

// 로그인 페이지에 쓰이는 스타일
export const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: #FFFAE8; */

  h1 {
    font-family: NanumSquare_ac;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #000000;
    margin-bottom: 20px;
  }

  p {
    display: inline-block;
    color: #8d8d8d;
    text-align: center;
    font-family: NanumSquare_ac;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  #RowBox {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #8d8d8d;
  }
`;

export const LoginFind = styled(NavLink)`
  display: flex;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  padding: 0.3em;
  color: #8d8d8d;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    /* background-color: #FAB400; */
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 60vw;
  max-width: 800px;
  margin-bottom: 20px;
  background: #ffffff;
  padding: 15px 40px;
  border-radius: 20px;

  h3 {
    text-align: start;
  }

  .terms-content {
    width: 95%;
    padding: 15px;
    background-color: #e9e9e9;
    border-radius: 5px;
    color: #616161;
    text-align: start;
    margin: 0px;
    overflow-y: scroll;
    height: 200px;

  }
  #agree_box {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    gap: 5px;
  }
  #agree_box input {
    margin: 0;
  }

  .Login_Input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px solid #ffcd82;
    margin-bottom: 10px;
    padding: 0 10px;
    margin: 15px 0;
    font-family: NanumSquare_ac;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  input::placeholder {
    color: #c7c7c7;
  }
  input[type="checkbox"] {
    margin-right: 10px;
  }

  label {
    font-family: NanumSquare_ac;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #8d8d8d;
  }
`;
export const ErrorMessage = styled.div`
  font-size: 14px;
  padding: 0 6px;
  margin-top: -10px;
  margin-bottom: 10px;
  color: #fe2e2e;
`;

export const Left_align = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  /* background-color: pink; */

  p {
    display: inline;
    justify-self: left;
    text-align: left;
  }
  input {
    border-radius: 20px;
    border: 1px solid #b9b9b9;
    margin: 0px;
    margin-bottom: 10px;
    padding-left: 10px;
    width: 98%;
    height: 50px;
  }
`;
export const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-family: NanumSquare_ac;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: #333333;
  }
`;

// 회원가입 페이지에 쓰이는 스타일
export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  h1 {
    font-family: NanumSquare_ac;
    line-height: normal;
    color: #000000;
    margin-bottom: 20px;
  }
`;
export const SignUpButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#D3D3D3" : "black")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-family: NanumSquare_ac;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-bottom: 20px;

  &:hover {
    background: ${(props) => (props.disabled ? "#D3D3D3" : "#1C1C1C")};
  }
`;
export const CheckIcon = styled.img`
  background: ${(props) =>
    props.isPasswordMatch && props.isPasswordValid ? "#FFCF55" : "#D3D3D3"};
  height: 20px;
  width: 20px;
  border-radius: 40px;
`;
export const Password_Ck = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0;
  gap: 10px;
`;

//////일반적인페이지 구성 툴
//Magazine, snap
export const Main_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  text-align: center;

  #title_bar {
    display: flex;
    width: 100%;
    padding: 0px 0px 15px 0px;
    border-bottom: 2px solid #c5c5c5;
  }
`;
export const H2_title = styled.h2`
  // 페이지 제목
  color: var(--, #000);
  margin: 0;
  ;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;
export const Example100 = styled.div`
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 5.4 / 3.1; //가로 세로 비율 1:1
  background-color: lightgray; /* 시각적으로 확인하기 위한 배경색 */
  object-fit: cover;
`;

export const Default = styled.span`
  color: #000;

  /* 디폴트 1 */
  ;
  font-size: 28.5px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
