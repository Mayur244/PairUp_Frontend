import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

  const  user = useSelector((store) => store.user);

  return user && (
    <div className='bg-gradient-to-r from-purple-500 to-pink-500'>
      <EditProfile user={user} />
    </div>
  )
}

export default Profile