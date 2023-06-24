import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://images.unsplash.com/flagged/photo-1578835445410-079e1d7e2e18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80`
  return (
    <div className="rounded border border-success p-2">
        <img
              src = {imageurl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
        />
    </div>
  )
}

export default ImageHelper;