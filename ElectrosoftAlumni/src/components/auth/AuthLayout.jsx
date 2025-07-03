import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* No navbar for auth pages */}
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
