import styled, { createGlobalStyle } from "styled-components";

export interface Colors {
  //   My colors  (start)
  brandBg: string;
  brandTextColor: string;
  myBorderColor: string;
  inputBg: string;
  inputTextColor: string;
  btnTextColor: string;
  btnBg: string;
  cardBg: string;
  //   My colors  (end)

  themeBackground: string;
  white: string;
  green: string;
  base: string;
  black: string;
  yellow: string;
  neon: string;
  buttonColor: string;
  cardBackground: string;
  gray: string;
  lightGray: string;
  InputBackground: string;
}

export const colors: Colors = {
  //   My colors  (start)
  brandBg: "#212429",
  brandTextColor: "#6053d6",
  myBorderColor: "#1e293b",
  inputBg: "#1f2937",
  inputTextColor: "#f3f4f6",
  btnBg: "#3730a3",
  btnTextColor: "#f3f4f6",
  cardBg: "#1e2025",
  //   My colors  (end)
  themeBackground: "#1B2732",
  white: "#ffffff",
  neon: "#00D7E7",
  green: "#01D14E",
  base: "#313131",
  black: "#333333",
  yellow: "#F3B723",
  buttonColor: "#F3B723",
  cardBackground: "#919ba5",
  gray: "#979797",
  lightGray: "#8499AE",
  InputBackground: "#767e86",
};

export interface ThemeStarter {
  //   My colors  (start)
  brandBg: string;
  brandTextColor: string;
  myBorderColor: string;
  inputBg: string;
  inputTextColor: string;
  btnTextColor: string;
  btnBg: string;
  cardBg: string;
  //   My colors  (end)
  [propName: string]: string | undefined;
  themeBackground: string;
  white: string;
  green: string;
  base: string;
  black: string;
  yellow: string;
  neon: string;
  buttonColor: string;
  cardBackground: string;
  gray: string;
  lightGray: string;
  InputBackground: string;
}

export const theme: ThemeStarter = {
  //   My colors  (start)
  brandBg: colors.brandBg,
  brandTextColor: colors.brandTextColor,
  myBorderColor: colors.myBorderColor,
  inputBg: colors.inputBg,
  inputTextColor: colors.inputTextColor,
  btnBg: colors.btnBg,
  btnTextColor: colors.btnTextColor,
  cardBg: colors.cardBg,
  //   My colors  (end)
  themeBackground: colors.themeBackground,
  white: colors.white,
  green: colors.green,
  base: colors.base,
  black: colors.black,
  yellow: colors.yellow,
  neon: colors.neon,
  buttonColor: colors.buttonColor,
  cardBackground: colors.cardBackground,
  gray: colors.gray,
  lightGray: colors.lightGray,
  InputBackground: colors.InputBackground,
};

export interface ScreenSizes {
  mediaXS: number;
  mediaSX: number;
  mediaS: number;
  mediaM: number;
  mediaL: number;
  mediaXL: number;
  mediaXXL: number;
  mediaLX: number;
  mediaLXX: number;
}
export const screenSizes: ScreenSizes = {
  mediaXS: 380,
  mediaSX: 400,
  mediaS: 640,
  mediaM: 800,
  mediaL: 1024,
  mediaXL: 1280,
  mediaXXL: 1480,
  mediaLX: 1800,
  mediaLXX: 2000,
};

export const GlobalStyle = createGlobalStyle`

:root {

  --toastify-font-weight:700;
}

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

  

body {
    background: #efebeb;
    margin: 0;
    padding: 16px;
    font-family:'sans-serif';
    width: 100vw;
    /* font-size:12pt ; */
    height: 100vh;
    color: #000F08;
   
}`;

export const AppWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
