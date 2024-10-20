import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import placeholder from '../assets/placeholder.jpg'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { deleteBook } from "../features/bookSlice";
import { useDispatch } from "react-redux";
import { getUserId } from "../utils/Utils";

export default function BookInfoDialog(props) {
  console.log(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const uid = getUserId();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requesteeDetails = { name, email, phoneNo };
    props?.submiteRequestDetails(requesteeDetails)
  }

  const editBookDetails = () => {
    navigate(`/add-book/${props?.book?.bookId}`)
  }

  const confirmDelete = (e) => {
    e.preventDefault();
    setOpenConfirmation(true);
  }

  const onDelete = (e) => {
    if(e) {
      dispatch(deleteBook(props?.book?.bookId));
      props?.toggleInfoDialog();
    }
  }

  const showActionButtons = () => {
    if(!uid || uid !== props?.book?.donorId) {
      return(<></>)
    }
    return (
      <div className="flex mb-5 sm:mb-0">
        <button
          onClick={editBookDetails}
          className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          data-autofocus
        >
          <PencilIcon className="size-5 mr-2" />
          Edit Book
        </button>
        <button
          onClick={(e) => confirmDelete(e)}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white border border-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          data-autofocus
        >
          <TrashIcon className="size-5 mr-2 text-red-600" />
          Delete Book
        </button>
      </div>
    )
  }

  return (
    <>
      <Dialog
        className="relative z-10"
        open={props?.showInfoDialog ?? false}
        onClose={props?.toggleInfoDialog}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <InformationCircleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-5 text-center sm:ml-4 sm:mt-2 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Book Information
                      </DialogTitle>
                      <div className="mt-5">
                        <div className="mt-5">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                              src={props?.book?.image.length === 0 ? placeholder : props?.book?.image}
                              // alt={props?.book?.imageAlt}
                              className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                              />
                          </div>
                        </div>
                        <div className="mt-5">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Subject : {props?.book?.subject}
                          </label>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Book Id : {props?.book?.bookId.substr(props?.book?.bookId.length-5, 5)}
                          </label>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Book Type : {props?.book?.bookType}
                          </label>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Grade : {props?.book?.grade}
                          </label>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description : {props?.book?.bookDesc}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-between sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={props?.toggleInfoDialog}
                  >
                    Ok
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={props?.onRequestBook}
                  >
                    Request Book
                  </button>
                  {showActionButtons()}
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ConfirmationDialog 
        open={openConfirmation} 
        onClose={(e) => setOpenConfirmation(false)} 
        book={props?.book} 
        onDelete={onDelete}
      />
    </>
  );
}
