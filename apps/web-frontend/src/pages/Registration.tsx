import React, { useState } from 'react';

const Registration = () => {

  const [dname, pickName] = useState("");
  const [demail, pickEmail] = useState("");
  const [dgender, pickGender] = useState("");
  const [phone, pickPhone] = useState("");
  const [password, pickPassword] = useState("");
  const [specialization, pickSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [city, PickCity] = useState("");
  const [profileimage, setProfileimage] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, updateMessage] = useState("");


  const save = () => {

    const CreateDoctor = {

      "name": dname,
      "email": demail,
      "gender": dgender,
      "phone": phone,
      "password": password,
      "specialization": specialization,
      "experience": experience,
      "city": city,
      "profileimage": profileimage,
      "availability": availability
    };

    const postData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(CreateDoctor)
    };

    fetch("http://localhost:8080/savedoctor", postData)
      .then(response => response.json())
      .then(res => {

        updateMessage("Doctor Data Saved Successfully !");

      })



  }
  const redirect = () => {

    alert("Your are Back to Home Page!");
    window.location.reload();

  }

  return (

    <div className='container-fluid mt-5'>
      <div className='row'>
        <div className='col-lg-9 form-control-md'>
          <h4 className='text-center text-primary'>Doctor Registration!</h4>
          <p className='text-center text-danger'>{message}</p>
          <div className='mb-3'>
            <label>Doctor Name</label>
            <input type='text' className='form-control' onChange={obj => pickName(obj.target.value)} value={dname} />
          </div>
          <div className='mb-3'>
            <label>Email</label>
            <input type='email' className='form-control' onChange={obj => pickEmail(obj.target.value)} value={demail} />
          </div>
          <div className='mb-3'>
            <label>Gender</label>
            <input type='text' className='form-control' onChange={obj => pickGender(obj.target.value)} value={dgender} />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input type='password' className='form-control' onChange={obj => pickPassword(obj.target.value)} value={password} />
          </div>
          <div className='mb-3'>
            <label>Phone</label>
            <input type='text' className='form-control' onChange={obj => pickPhone(obj.target.value)} value={phone} />
          </div>
          <div className='mb-3'>
            <label>Specialization</label>
            <input type='text' className='form-control' onChange={obj => pickSpecialization(obj.target.value)} value={specialization} />
          </div>
          <div className='mb-3'>
            <label>Experience</label>
            <input type='text' className='form-control' onChange={obj => setExperience(obj.target.value)} value={experience} />
          </div>
          <div className='mb-3'>
            <label>City</label>
            <input type='text' className='form-control' onChange={obj => PickCity(obj.target.value)} value={city} />
          </div>
          <div className='mb-3'>
            <label>ProfileImage</label>
            <input type='url' className='form-control' onChange={obj => setProfileimage(obj.target.value)} value={profileimage} />
          </div>
          <div className='mb-3'>
            <label>Availability</label>
            <input type="datetime-local" className='form-control' onChange={obj => setAvailability(obj.target.value)} value={availability} />
          </div>
          <div>

          </div>
          <div className='text-center mb-4'>
            <button className='btn btn-success btn-sm text-white' onClick={save}>Save Doctor</button>
          </div>
          <div className='text-center'>
            <button className='btn btn-danger btn-sm text-white' onClick={redirect}>Cancel</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Registration;