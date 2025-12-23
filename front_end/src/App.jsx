import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AuthPage from "./pages/auth/Login";
const App = () => {
  return (
    <>
    {/*<div className="flex h-screen overflow-hidden">
  <Sidebar />
  <Dashboard />  This takes up the remaining space 
</div>*/}
      
        <AuthPage />
      </>
  );
};

export default App;