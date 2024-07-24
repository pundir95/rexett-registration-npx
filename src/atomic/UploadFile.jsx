import React from 'react'
import { Form } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'

const UploadFile = ({label,placeholder}) => {
  return (
    <>
     <div className="mb-3">
        <Form.Label className="font-14 fw-medium">{label} *</Form.Label>
        <Form.Control type="file" className="d-none" id="intro-video" />
        <Form.Label htmlFor="intro-video" className="upload-intro-file">{placeholder}</Form.Label>
    </div>
    <div>
        <div className="d-flex justify-content-between align-items-center gap-5 p-2 bg-light rounded-3 mb-3">
            <span className="font-14 fw-medium">resume-doc1.pdf</span>
            <span className="cursor-pointer text-danger"><IoClose /> </span>
        </div>
    </div>
    </>
   
  )
}

export default UploadFile