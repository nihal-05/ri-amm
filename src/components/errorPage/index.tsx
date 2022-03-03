import styled from "styled-components";

export const ErrorPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: sans-serif;
  h2 {
    font-weight: 300;
    font-size: 28px;
    color: rgb(43, 43, 43);
    text-align: center;
  }
  img {
    display: block;
  }

  p {
    text-align: center;
    font-size: 1.3rem;
  }
`;

const warningSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-20 0 60 20"
    width="150"
    height="100"
  >
    <path
      d="M9.2456 5.0302c.5001-.1232 1.021.1232 1.2294.5954.0625.1643.1042.3285.1042.5133-.0209.5133-.0625 1.047-.1042 1.5604-.0417.8007-.1042 1.622-.1459 2.4227-.0208.2669-.0208.2874-.0208.5543-.0208.4312-.3542.7597-.7918.7597-.4376 0-.771-.308-.7918-.7391-.0625-1.2525-.1458-2.2996-.2083-3.552-.0209-.3285-.0417-.657-.0625-1.006-.0209-.5133.2917-.965.7917-1.1087m.271 9.4444c-.5835 0-1.0627-.4722-1.0627-1.047 0-.575.4792-1.0472 1.0626-1.0472.5834 0 1.0627.4723 1.0418 1.0677.0209.5543-.4792 1.0265-1.0418 1.0265M2.849 17h13.2936c2.1878 0 3.563-2.3611 2.4795-4.209L11.9544 1.4168c-1.0835-1.889-3.834-1.889-4.9174 0L.3694 12.791C-.6933 14.6594.661 17 2.8489 17"
      fill="#DC2E2E"
      fillRule="evenodd"
    />
  </svg>
);

const ErrorPage = ({ supportNetwork }: { supportNetwork: string }) => {
  return (
    <ErrorPageWrapper>
      {/* <img width={50} src={warningSvg} alt="warning sign" /> */}
      {warningSvg}
      <h2>Unsupported Network</h2>
      <br />
      <p>
        Please change your dapp browser to <strong>{supportNetwork}</strong>
      </p>
    </ErrorPageWrapper>
  );
};

export default ErrorPage;
