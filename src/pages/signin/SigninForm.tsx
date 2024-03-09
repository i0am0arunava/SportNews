import React from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      
      // extract the response body as JSON data
      const responseData = await response.json();

      // After successful signin, save the token in localStorage
      localStorage.setItem('authToken', responseData.auth_token);
      localStorage.setItem('userData', JSON.stringify(responseData.user));
      navigate("/account");
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label  className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input id="email" type="email" {...register('email', { required: true })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input id="password" type="password" {...register('password', { required: true })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      
      <div className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </div><button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
      <Link to="/" className="text-blue-500">Go To As a GUEST</Link>
    </form>
    
  );
};

export default SigninForm;
