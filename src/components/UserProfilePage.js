import React from 'react';

//get currentUser obj through props 
//map through props to display User profile information
//add logic to handleclick 
const ProfilePage = (props) => {
    const handleEdit= () => {
       console.log('mama i made it')
      };
    return (
        <div className='container pt-6'>
           <button onClick={handleEdit}>Edit Profile</button>
        </div>
    )

}

export default ProfilePage;