import * as EYEMOVEMENTS from "../constants/eyeMovements";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";

export const sequenceOne = [
  {
    id: 0,
    exercise: EYEMOVEMENTS.looksLeftWithLeftEye,
    icon: <AiOutlineArrowLeft />,
  },
  {
    id: 1,
    exercise: EYEMOVEMENTS.looksRightWithLeftEye,
    icon: <AiOutlineArrowRight />,
  },
  {
    id: 2,
    exercise: EYEMOVEMENTS.looksUpWithLeftEye,
    icon: <AiOutlineArrowUp />,
  },
  {
    id: 3,
    exercise: EYEMOVEMENTS.looksRightWithLeftEye,
    icon: <AiOutlineArrowRight />,
  },
  {
    id: 4,
    exercise: EYEMOVEMENTS.looksLeftWithLeftEye,
    icon: <AiOutlineArrowLeft />,
  },
  {
    id: 5,
    exercise: EYEMOVEMENTS.looksDownWithRightEye,
    icon: <AiOutlineArrowDown />,
  },
];
