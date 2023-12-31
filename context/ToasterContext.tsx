"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return <Toaster toastOptions={{ duration: 3000, position: "top-center" }} />;
};

export default ToasterContext;
