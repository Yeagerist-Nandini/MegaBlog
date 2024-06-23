import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

// $id => syntax of appwrite  
function PostCard({$id,title,featuredImage}) { 
    // console.log($id,title,featuredImage)
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full  rounded-lg p-4 bg-gray-200 text-center border border-black/30 '>
                <div className='justify-center mb-4 h-2/3'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-full'/>
                </div>

                <h2 className='text-xl font-bold h-1/3 p-4'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard