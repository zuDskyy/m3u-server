import React from "react";

const CleanButton = () => {
  const handleResetApp = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the app?"
    );
    if (confirmReset) {
      localStorage.removeItem("persist:root");
      window.location.reload();
    }
  };
  return (
    <button
      type="button"
      onClick={handleResetApp}
      className="w-full py-2 mt-2 bg-red-500 hover:bg-red-700 transition-all text-white rounded-lg text-sm"
    >
      🧹 Reset App (Clear LocalStorage)
    </button>
  );
};

export default CleanButton;
