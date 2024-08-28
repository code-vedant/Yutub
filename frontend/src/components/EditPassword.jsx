import React from 'react'
import { useForm } from 'react-hook-form'
import "../style/editDetails.css";

function EditPassword() {
  const {register,handleSubmit} = useForm()
  return (
    <div className='EP-Main'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Current Password:</label>
        <input type='password' {...register('currentPassword')} />
        <label htmlFor="">New Password:</label>
        <input type='password' {...register('newPassword')} />
        <p>Your new password must be more than 8 characters.</p>
        <label htmlFor="">Confirm New Password:</label>
        <input type='password' {...register('confirmPassword')} />
        <div className="EP-Btn">
          <button type="submit">Update Password</button>
          <button type="cancel" className='CancelBtn'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditPassword