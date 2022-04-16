import React from "react";
import { Toaster } from "react-hot-toast";

const Notification = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          color: "#fff",
          width: "300px",
          height: "70px",
          fontSize: "18px",
        },
        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: "var(--accent-primary-color)",
          },
        },
        error: {
          duration: 3000,
          theme: {
            primary: "drey",
            secondary: "black",
          },
          style: {
            background: "grey",
          },
        },
      }}
    />
  );
};

export default Notification;
