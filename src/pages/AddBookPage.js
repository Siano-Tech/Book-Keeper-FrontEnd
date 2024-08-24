import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../features/bookSlice';
import { Link } from 'react-router-dom';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import { generateUid, getUserId } from '../utils/Utils';
import { UploadFile } from '../utils/UploadFile';
import toast from 'react-hot-toast';
import { filters } from '../utils/Data';

const AddBookPage = () => {
  const dispatch = useDispatch();
  const [bookType, setBookType] = useState('Text Book');
  const [subject, setSubject] = useState('Maths');
  const [grade, setGrade] = useState('10');
  const [bookDesc, setBookDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  const donorId = getUserId();
  const [uploadProgress, setUploadProgress] = useState();
  const [downloadURL, setDownloadURL] = useState('');
  const { navigateTo } = useSelector(state => state.books);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(uploadProgress < 100) {
      toast.error('Cover Photo is uploading, please wait...');
      return;
    }
    // if(!downloadURL) {
    //   toast.error('Cover Photo Required');
    //   return;
    // }
    const bookId = generateUid();
    dispatch(addBook({ bookType, subject, grade, bookDesc, image: downloadURL, bookId, donorId }));
  };
  
  if(navigateTo) {
    navigate(navigateTo);
    window.location.reload();
  }

  const onFileUpload = (e) => {
    setImage(e.target.files);
    if(e.target.files && e.target.files.length>0) {
      setImageFile(URL.createObjectURL(e.target.files[0]));
    };
    handleUpload(e.target.files[0]);
  }

  const handleUpload = (file) => {
    if (file) {
      UploadFile(
        file,
        (status) => console.error(status),
        (progress) => setUploadProgress(progress),
        (url) => setDownloadURL(url),
      );
    }
  };

  return (
    <div className='mx-auto max-w-5xl p-6 lg:px-8'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add Book</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please provide the information of the book, this information will be displayed on this platform so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="sm:col-span-2">
                <label htmlFor="book-type" className="block text-sm font-medium leading-6 text-gray-900">
                  Book Type
                </label>
                <div className="mt-2">
                  <select
                    id="book-type"
                    name="book-type"
                    value={bookType}
                    onChange={(e) => setBookType(e.target.value)}
                    autoComplete="book-type"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {filters[0].options.map((e) => <option>{e.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                  Subject
                </label>
                <div className="mt-2">
                  <select
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    autoComplete="subject"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {filters[2].options.map((e) => <option>{e.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="grade" className="block text-sm font-medium leading-6 text-gray-900">
                  Grade
                </label>
                <div className="mt-2">
                  <select
                    id="grade"
                    name="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    autoComplete="grade"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {filters[1].options.map((e) => <option>{e.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    value={bookDesc}
                    onChange={(e) => setBookDesc(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the book like publisher, edition etc…</p>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {!imageFile && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> }
                    {imageFile && <img width={300} src={imageFile} />}
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" value={image[0]?.fileName}
                          accept="image/*"
                          onChange={onFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <div className="flex justify-center text-sm leading-6 text-gray-600">
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    {(uploadProgress > 0 && uploadProgress < 100) && <div>
                      {/* <progress value={uploadProgress} max="100" style={{height: '5px'}} /> */}
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
                        <div className="relative h-6 flex items-center justify-center">
                          <div className={`absolute top-0 bottom-0 left-0 rounded-lg w-[${uploadProgress}] bg-green-200`}></div>
                          <div className="relative text-green-900 font-medium text-sm">{uploadProgress} %</div>
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>

              {/* <div className="col-span-full flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="request-consent"
                    name="request-consent"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    required
                  />
                </div>
                <div className="text-xl leading-6">
                  <label htmlFor="request-consent" className="font-medium text-gray-900">
                    I agree to share my contact details with the receiver
                  </label>
                </div>
              </div> */}
              <div className="col-span-full flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="donation-consent"
                    name="donation-consent"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    required
                  />
                </div>
                <div className="text-xl leading-6">
                  <label htmlFor="donation-consent" className="font-medium text-gray-900">
                    I agree to donate the books free of cost
                  </label>
                  {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know who has requested for the books.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-5 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  )

};

export default AddBookPage;
