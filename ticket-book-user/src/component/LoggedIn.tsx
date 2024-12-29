import { Outlet } from "react-router-dom";

const LoggedInComponent = () => {
  return (
    <>
      <div className="layout-container flex  min-h-screen">
        {/* Main content area */}
        <div className="layout-page ">
          {/* Top Navigation */}
          {/* Add your header or navigation here if needed */}
          <div className="content-wrapper bg-gray-50 flex-grow overflow-auto p-4">
            <Outlet /> {/* Nested routes will render here */}
          </div>
        </div>

        {/* Footer */}
      </div>
    </>
  );
};

export default LoggedInComponent;
