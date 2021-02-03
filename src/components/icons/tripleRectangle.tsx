const tripleRectangle = ({ ...rest }) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x="4" y="4" width="6" height="16" rx="2" />
    <rect x="10" y="4" width="6" height="16" rx="2" />
    <rect x="16" y="4" width="6" height="16" rx="2" />
  </svg>
);

export default tripleRectangle;
