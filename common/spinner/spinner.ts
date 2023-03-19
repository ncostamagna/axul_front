import { useEffect, useState } from "react";
import Router from "next/router";
import Spinner from "@/components/Spinner/Spinner";
import useSpinner from "@/hooks/useSpinner";
//import Spinner from "@/common/spinner/spinner";
export const withSpinnerSync = (spinner: boolean, Component: JSX.Element) => {
  return spinner ? Spinner() : Component;
};
