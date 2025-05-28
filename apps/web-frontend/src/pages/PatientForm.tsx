import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  gender: string;
  phone: number;
  password: string;
  dob: string;
  doctorToConsult: string;
  amount: number;
  agreeToTerms: boolean;
}

const PatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const patientData = {
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        dob: data.dob, // Ensure this is in YYYY-MM-DD format
        password: data.password,
        doctortoconsult: data.doctorToConsult,
        amount: Number(data.amount), // Convert to number
        termsaccepted: Boolean(data.agreeToTerms) // Ensure boolean
      };

      await fetch('http://localhost:8080/savepatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData)
      });

      console.log('Patient created:', data);
      alert('Patient form submitted successfully!');
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Registration</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Patient Name */}
        <div className='mb-3'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Patient Name*
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Patient name is required' })}
            className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700">Gender*</label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="male"
                {...register('gender', { required: 'Gender is required' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="female"
                {...register('gender')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className='mb-3'>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone*
          </label>
          <input
            type="number"
            id="phone"
            {...register('phone', { required: 'Phone is required' })}
            className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Password*/}
        <div className='mb-3'>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password*
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className='mb-3'>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth*
          </label>
          <input
            type="date"
            id="dob"
            {...register('dob', { required: 'Date of birth is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm form-control focus:border-blue-500 focus:ring-blue-500 ${
              errors.dob ? 'border-red-500' : 'border'
            }`}
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>

        {/* Agree to Terms */}
        <div className="flex items-start mb-3">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register('agreeToTerms', {
                required: 'You must agree to the terms and conditions',
              })}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              I agree to the terms and conditions*
            </label>
          </div>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
        )}

        {/* Submit Button */}
        <div className='mb-3'>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;