import { SharedBox } from "./styled";

interface ISharedBlockProps {
  title?: string;
  values?: any[];
  color?: string;
  [key: string]: any;
}

export const SharedBlock = ({
  title,
  color,
  values = [],
}: ISharedBlockProps) => {
  const stringValues = ["BUST-LP", "BUSD", "BUST"];

  return (
    <>
      <SharedBox direction="row" justify="center" color={color}>
        {/* // @ts-ignore */}
        <h4>{title}</h4>
      </SharedBox>

      {stringValues.map((value, idx) => (
        <SharedBox direction="row" key={value} justify="space-between">
          <p>{values!.length > 0 ? values![idx] : "----"}</p>
          <p>{value}</p>
        </SharedBox>
      ))}
    </>
  );
};

export const SharedPlusSign = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C3C5CB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const SharedArrowSign = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C3C5CB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

export const SharedLoader = (
  <svg
    width="20px"
    height="118px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#290908"
      strokeWidth="13"
      r="31"
      strokeDasharray="146.08405839192537 50.69468613064179"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);
