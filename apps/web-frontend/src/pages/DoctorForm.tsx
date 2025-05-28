import { useState, useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  specialization: string;
  experience: string;
  city: string;
  profileimage: string;
  availability: string;
  password?: string; // Optional as it might not be needed in the frontend
}

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:8080/doctors");
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      setMessage("Failed to fetch doctors data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

const Moreinfo= ()=>{

  alert("Search the Doctor Appointment Availability and Book!");
}

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {message && (
          <p className={`text-center ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-primary text-center">Doctor Appointment!</h2>
            {loading ? (
              <p className="text-gray-500">Loading doctors...</p>
            ) : doctors.length === 0 ? (
              <p className="text-gray-500">No doctors added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        {doctor.profileimage ? (
                          <img
                            src={doctor.profileimage}
                            alt={`${doctor.name}'s profile`}
                            className="h-40 w-40 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <p className="text-xs text-gray-500">{doctor.experience} years experience</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-600">{doctor.email}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-gray-600">{doctor.gender}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{doctor.city}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{doctor.availability}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button className="bg-blue-400 hover:bg-gray-200 text-white-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex-1 ml-2 text-center" onClick={Moreinfo}>
                          More Info
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}