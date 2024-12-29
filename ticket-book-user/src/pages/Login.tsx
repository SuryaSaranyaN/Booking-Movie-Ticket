// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Login } from '../api/api.services'; 

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation to ensure fields are not empty
//     if (!email || !password) {
//       alert('Please fill in both email and password.');
//       return;
//     }

//     try {
//       const payload = { email, password }; // Use correct field names
//       console.log('Payload:', payload); // Debugging: log payload

//       const response = await Login(payload); // Call the Login API

//       if (response && response.token) {
//         sessionStorage.setItem('authToken', response.token); // Store token
//         alert('Login successful!'); // Success alert
//         navigate('/dashboard'); // Redirect to dashboard
//       } else {
//         alert('Unexpected response from the server.'); // Handle unexpected response
//       }
//     } catch (error: any) {
//       // API error handling
//       const errorMessage = error?.response?.data?.message || 'An error occurred during login.';
//       alert(errorMessage); // Display error message
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block font-semibold text-sm sm:text-base text-left mb-3 text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email" // Use "email" type for better validation
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold sm:text-base text-left mb-3 text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Login } from '../api/api.services'; 

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectPath = location.state?.from || '/dashboard';

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage('Please fill in both email and password.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await Login({ email, password });
//       if (response && response.token) {
//         sessionStorage.setItem('authToken', response.token);
//         navigate(redirectPath);
//       } else {
//         setErrorMessage('Unexpected response from the server.');
//       }
//     } catch (error: any) {
//       const errorMsg = error?.response?.data?.message || 'An error occurred during login.';
//       setErrorMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {errorMessage && (
//           <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
//             {errorMessage}
//           </div>
//         )}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block font-semibold text-sm sm:text-base text-left mb-3 text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold sm:text-base text-left mb-3 text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 px-4 font-semibold rounded-md ${
//               loading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500'
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Login } from '../api/api.services';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path: default to dashboard if none is specified
  const redirectPath = location.state?.from || '/home';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await Login({ email, password });
      if (response && response.token) {
        sessionStorage.setItem('authToken', response.token);
        navigate(redirectPath);
      } else {
        setErrorMessage('Unexpected response from the server.');
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || 'An error occurred during login.';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold text-sm sm:text-base text-left mb-3 text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold sm:text-base text-left mb-3 text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not signed in?{' '}
            <button
              onClick={() => navigate('/home')}
              className="text-gray-800 hover:text-gray-700 underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

