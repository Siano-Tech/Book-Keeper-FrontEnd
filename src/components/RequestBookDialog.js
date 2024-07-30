import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function RequestBookDialog(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requesteeDetails = { name, email, phoneNo };
    props?.submiteRequestDetails(requesteeDetails)
  }

  return (
    <Dialog
      className="relative z-10"
      open={props?.showRequestDialog ?? false}
      onClose={props?.toggleRequestDialog}
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
                    <HeartIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-2 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Please provide the following details to request
                    </DialogTitle>
                    <div className="mt-5">
                      <div className="mt-5">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <label
                          htmlFor="tel"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone No
                        </label>
                        <div>
                          <input
                            id="phoneNo"
                            name="tel"
                            type="tel"
                            autoComplete="tel"
                            value={phoneNo}
                            maxLength={10}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="request-consent"
                            name="request-consent"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            required
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label htmlFor="request-consent" className="font-medium text-gray-900">
                            I agree to share my contact details with the donor
                          </label>
                          {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={props?.toggleRequestDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  data-autofocus
                >
                  Request
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
