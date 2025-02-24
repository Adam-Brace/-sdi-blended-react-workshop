import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import FocusContext from "./FocusContext";

export default function Focus() {
  const { details, setDetails } = useContext(FocusContext);//{id, bool}
  
  useEffect (() => {

  })