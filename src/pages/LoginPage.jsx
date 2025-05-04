import LoginForm from "../components/LoginForm";

const LoginPage = ({ setIsAuthenticated }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <LoginForm setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default LoginPage;
