import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface FormData {
  name: string;
  gender: string;
  phone:number;
  password:string;
  dob: string;
  doctorToConsult: string;
  amount: number;
  agreeToTerms: boolean;
}

const PatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctors list from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>('http://localhost:8080/doctors');
        setDoctors(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load doctors list');
        setIsLoading(false);
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, []);


  const onSubmit = async (data: FormData) => {
    try {

      const patientData = {
      name: data.name,
      gender: data.gender,
      phone: data.phone,
      dob: data.dob, // Ensure this is in YYYY-MM-DD format
      password: data.password, // Optional field
      doctortoconsult: data.doctorToConsult,
      amount: Number(data.amount), // Convert to number
      termsaccepted: Boolean(data.agreeToTerms) // Ensure boolean
    };

        await fetch('http://localhost:8080/savepatient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
          })
      
      console.log('Patient created:', data);
      alert('Patient form submitted successfully!');
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
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
          </div>
          <div className='mb-3'>
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
          <div className='mb-3'>
                {/* Phone */}
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone*
          <input
            type="number"
            id="phone"
            {...register('phone', { required: 'Phone is required' })}
            className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border'
            }`}
          />
          </label>
        </div>
        <div className='mb-3'>
              {/* Password*/}
           <label className="inline-flex items-center mb-3">
            Password*
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Phone is required' })}
            className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border'
            }`}
            
          />
          </label>
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

        {/* Doctor to Consult */}
        <div className='mb-3'>
          <label htmlFor="doctorToConsult" className="block text-sm font-medium text-gray-700">
            Doctor to Consult*
          </label>
          {isLoading ? (
            <div className="mt-1 animate-pulse  form-control h-10 bg-gray-200 rounded-md"></div>
          ) : (
            <select
              id="doctorToConsult"
              {...register('doctorToConsult', { required: 'Doctor selection is required' })}
              className={`mt-1 block w-full rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.doctorToConsult ? 'border-red-500' : 'border'
              }`}
              disabled={isLoading}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </select>
          )}
          {errors.doctorToConsult && (
            <p className="mt-1 text-sm form-control text-red-600">{errors.doctorToConsult.message}</p>
          )}
        </div>

        {/* Payment Amount */}
        <div className='mb-3'>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Payment Amount (INR)*
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              {...register('amount', {
                required: 'Payment amount is required',
                min: { value: 0, message: 'Amount must be positive' },
                valueAsNumber: true,
              })}
              className={`block w-full pl-7 pr-12 rounded-md form-control border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.amount ? 'border-red-500' : 'border'
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
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
</div>
        {/* Submit Button */}
        <div className='mb-3'>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;