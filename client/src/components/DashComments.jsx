import { Modal, Table ,Button} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useSelector} from 'react-redux'

export default function DashComments() {
   
  const {currentUser} = useSelector((state)=> state.user);
  const [comments,setComments] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete] = useState('')

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const res =await fetch(`${__API_BASE__}/comment/getcomments`)
        const data = await res.json()
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    };
    if(currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore= async()=>{
    const startIndex = comments.length;
    try {
      const res = await fetch(`${__API_BASE__}/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> [...prev, ...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(`${__API_BASE__}/comment/deletecomment/${commentIdToDelete} `,{
        method:'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> prev.filter((comment)=> comment._id !== commentIdToDelete));
        setShowModal(false);
      }else{
        console.log(error.message)
      }
    } catch (error) {
      console.log(error.message)
      }
  }
  
 
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-100
    dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ?(
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Comment content</Table.HeadCell>
            <Table.HeadCell>Number of likes </Table.HeadCell>
            <Table.HeadCell>postId</Table.HeadCell>
            <Table.HeadCell>userId</Table.HeadCell>
            <Table.HeadCell>delete</Table.HeadCell>
          </Table.Head>
          {comments.map((comment)=>(
            <Table.Body className='divide-y' key={comment._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(comment.UpdatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                    {comment.content}
                </Table.Cell>
                <Table.Cell>
                   {comment.numberOfLikes}
                </Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                    setCommentIdToDelete(comment._id);
                  }} 
                  className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
          <button  onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
          Show more
          </button>
        )}
        </>
      ) 
      :
      (
          <p>You have no Comments yet</p>
      ) }
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup 
              size='md'>
            <Modal.Header/>
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-bg-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want you to delete this comment ?</h3>
                <div className='flex justify-between gap-5'>
                  <Button color='failure' onClick={handleDeleteComment}>
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
