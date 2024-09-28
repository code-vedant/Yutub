import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import "../style/editDetails.css";
import { useSelector } from 'react-redux';
import AuthService from '../Service/auth';

function EditPassword({closeModal}) {
  const accessToken = useSelector((state)=> state.auth.accessToken)
  const [error,setError] = useState("")

  const ChangePassword = async (data)=> {
    setError("")
    
    try {
      if(data.newPassword === data.confirmPassword){
      const res = await AuthService.changeCurrentPassword(accessToken,data)
      if(res){
        alert('Password changed successfully')
        window.location.reload()
      }
      }
      else{
        setError('Passwords do not match')
      }
    } catch (error) {
      console.error(error)
      setError('Failed to change password')
    }
  }


  const {register,handleSubmit} = useForm()
  return (
    <div className='EP-Main'>
      <form onSubmit={handleSubmit(ChangePassword)}>
        {error && <p className='errorMessage'>{error}</p> }
        <label htmlFor="">Current Password:</label>
        <input type='password' {...register('oldPassword')} />
        <label htmlFor="">New Password:</label>
        <input type='password' {...register('newPassword')} />
        <p>Your new password must be more than 8 characters.</p>
        <label htmlFor="">Confirm New Password:</label>
        <input type='password' {...register('confirmPassword')} />
        <div className="EP-Btn">
          <button type="submit">Update Password</button>
          <button type="cancel" onClick={closeModal} className='CancelBtn'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditPassword