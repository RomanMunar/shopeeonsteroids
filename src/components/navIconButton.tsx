import { ReactNode } from "react";
import { MotionBox } from ".";

interface Props {
  icon: ReactNode;
  onClick: () => void;
  active: boolean;
}
const navIcon = ({ icon, active, onClick }: Props) => (
  <MotionBox
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    // @ts-ignore
    transition={{ type: "tween", duration: 0.1 }}
    onClick={onClick}
    py={["1", "2"]}
    px={["1", "3"]}
    textColor={active ? "gray.800" : "gray.600"}>
    {icon}
  </MotionBox>
);

export default navIcon;
