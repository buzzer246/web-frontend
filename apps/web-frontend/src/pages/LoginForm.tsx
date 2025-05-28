'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

type FormData = {
  name: string;
  password: string;
};

type LoginFormProps = {
  onLoginSuccess: (isDoctor: boolean) => void;
  onLoginFailure: (isPatient: boolean) => void;
};

export default function LoginForm({ onLoginSuccess, onLoginFailure }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo authentication logic
    const isDoctor = data.name === "Dr.AvinashReddyK" && data.password === "Creative@426800";
    const isPatient = data.name === "G Girish Kumar" && data.password === "Admin@426800";

    if (isDoctor || isPatient) {
      onLoginSuccess(isDoctor);
    } else {
      onLoginFailure(isPatient); // Note: isPatient will be false here
    }
  } catch (error) {
    onLoginFailure(false); // Need to pass a boolean here
  } finally {
    setIsSubmitting(false);
  }
};
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name*
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password*
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
            </div>
          </div>
        </div>
      </div>
    );
    
  }