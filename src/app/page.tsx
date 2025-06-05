"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [file, setFile] = useState<File|null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    inputRef.current?.addEventListener("change", (e)=>{
      const input = e.target as HTMLInputElement
      if (input.files && input.files.length > 0) {
        setFile(input.files[0])
      }      
    })
  }, [])

  const handleClickUploadButton = ()=>{
    inputRef.current?.click()
  }

  const handleClickSubmitButton = async()=>{
    const data = new FormData()
    data.append("file", file as Blob)
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        body: data
      })
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div>
      <main>
        <div className="header">
          <h1>Welcome to Unplag !</h1>
          <p>Fight plagiarism easily.</p>
          <p>Unplag is a tool designed to help you detect and prevent plagiarism in your work.</p>
        </div>
        <div className="button-wrapper upload">
          <button onClick={handleClickUploadButton} className="button-64" role="button"><span className="text">{!file ? "Upload your file" : "Upload another file"}</span></button>
        </div>
        {file && <div className="file-info">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        }
        {file && <div className="button-wrapper submit">
          <button onClick={handleClickSubmitButton} className="button-64" role="button"><span className="text">Submit your file</span></button>
        </div>}
        <input ref={inputRef} type="file" hidden/>
      </main>
    </div>
  );
}
