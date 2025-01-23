import { Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess} from '../redux/user/userSlice'
import { use } from 'react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';


export default function DashProfile() {
    const {currentUser,/*error skiped session*/} = useSelector(state =>state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl]= useState(null);
    const [imageFileUploadeProgress,setImageFileUploadeProgress]=useState(null)
    const [formData,setFormData]=useState({})
    const [showModal,setShowModal]=useState(false)
    const filePickerRef=useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e)=>{
      const file = e.target.files[0];
      if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(()=>{
      if(imageFile){
        uploadImage();
      }
    },[imageFile]);
    const uploadImage=async () =>{
      console.log('uploading image...')
    }
    const handleDeleteUser=async()=>{
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res =await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };

    const handleSignout =async ()=>{
      try {
        const res =await fetch('/api/user/signout',{
          method:'POST',
        });
        const data =await res.json();
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message)
      }
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
         onClick={()=>filePickerRef.current.click()}>
          {imageFileUploadeProgress &&(
            <CircularProgressbar value={imageFileUploadeProgress || 0} text={`${imageFileUploadeProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path:{
                  stroke:`rgba(62,152,199,${imageFileUploadeProgress/100})`,
                },
              }}
            />
          ) }
            <img src={imageFileUrl ||currentUser.profilepicture} alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
           Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup 
        size='md'>
      <Modal.Header/>
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='h-14 w-14 text-bg-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want you to delete your account </h3>
          <div className='flex justify-between gap-5'>
            <Button color='failure' onClick={handleDeleteUser}>
              Yes, I'm sure
            </Button>
            <Button color='gray' onClick={()=>setShowModal(false)}>
              No,cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
      </Modal>
    </div>
  )
}
