import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import {useNavigate} from 'react-router-dom'
import { use } from 'react';

export default function CreatePost() {
  const [file,setFile] = useState(null);
  const [imageUploadProgress,setImageUploadProgress] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(null)
  const [FormData,setFormData] =useState({});
  const [publishError,setPublishError] = useState(null)
  const navigate = useNavigate()

  const handelUploadImage = async () =>{
    try {
      if(!file){
        setImageUploadError('Please select a image')
        return;
      }
      setImageUploadError(null);
      const storage = getStorage()
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef= ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
         setImageUploadProgress(progress.toFixed(0)); 
        },
        (error)=>{
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...FormData,image:downloadURL})
          })
        }
      )
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) =>{
   e.preventDefault();
   try{
    const res = await fetch(`${__API_BASE__}/post/create`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(FormData),
    });
    const data =await res.json();
    if(!res.ok){
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    }
   }catch(error){
    setPublishError('Something went wrong')
   }
  }
  return (
    <div className='p-3 ma max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
          onChange={(e)=>
            setFormData({...FormData,title:e.target.value})
          }
          />
          <Select onChange={(e)=>
            setFormData({...FormData,category:e.target.value})
          }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500
         border-dotted p-3'>
         <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
         <Button type='button' gradientDuoTone='purpleToBlue' size='sm'
          onClick={handelUploadImage}
          disabled={imageUploadProgress}
          >


          {imageUploadProgress ? (
            <div className='w-16 h-16'>
             <CircularProgressbar 
               value={imageUploadProgress}
               text={`${imageUploadProgress || 0}%`}
               />
            </div>
          ):
           ('Upload Image')}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {FormData.image && (<img src={FormData.image} alt='upload' className='w-full h-72 object-cover' />)}
        <ReactQuill 
        theme='snow' 
        placeholder='Write something...' 
        className='h-72 mb-12' 
        required
        onChange={(value)=>{
          setFormData({...FormData,content:value})
        }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        {publishError && <Alert className='mt-5'color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}
