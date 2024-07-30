import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, filterBooks } from '../features/bookSlice';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import RequestBookDialog from '../components/RequestBookDialog';
import { requestBook } from '../features/requestSlice';
import { getUser } from '../utils/Utils';
import BookInfoDialog from '../components/BookInfoDialog';
import { filters, sortOptions, subCategories } from '../utils/Data';
import placeholder from '../assets/placeholder.jpg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const HomePage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestingBook, setRequestingBook] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    setSelectedFilters(filters);
    dispatch(fetchBooks());
  }, []);

  const onRequestBook = (e, book) => {
    e.stopPropagation();
    console.log('Requesting Book : ', book);
    setRequestingBook(book);
    setShowRequestDialog(true);
  }

  const submiteRequestDetails = (details) => {
    console.log('Request Details : ', details);
    setShowRequestDialog(false);

    const requestingDetails = {
      bookId: requestingBook.id,
      name: details.name,
      email: details.email,
      phoneNo: details.phoneNo,
      bookDetails: requestingBook,
    }
    dispatch(requestBook(requestingDetails))
  }

  const onChangeFilters = (filterName, filterValue, e) => {
    const checked = e.target.checked;
    let typeFilter = []; 
    let gradeFilter = []; 
    let subjectFilter = [];
    // console.log({filterName, filterValue, value: checked});
    if(filterName === 'Grade') {
      selectedFilters[0].options.map((e) => {
        if(e.value === filterValue) e.checked = checked
      })
    } else {
      selectedFilters[1].options.map((e) => {
        if(e.value === filterValue) e.checked = checked
      })
    }

    gradeFilter = selectedFilters[0].options.map(e => e.checked ? e.value : null).filter(e => e !== null).join(',');
    subjectFilter = selectedFilters[1].options.map(e => e.checked ? e.value : null).filter(e => e !== null).join(',');
    console.log(gradeFilter, subjectFilter);
    dispatch(filterBooks({gradeFilter, subjectFilter}));
  }

  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-2xl font-bold">Available Books</h1>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  //       {books.map((book) => (
  //         <div key={book.id} className="p-4 border rounded shadow">
  //           <h2 className="text-xl font-bold">{book.name}</h2>
  //           {/* <p>Author: {book.author}</p> */}
  //           <p>Grade: {book.grade}</p>
  //           {book.image && <img src={book.image} alt={book.name} />}
  //         </div>
  //       ))}
  //     </div>
  //     <Link to={'/add-book'} className="p-2 bg-blue-500 text-white rounded">
  //       Add Book
  //     </Link>
  //   </div>
  // );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
          <DialogBackdrop
            transition
            className="fixed  bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed  z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => onChangeFilters(section.name, option.value, e)}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">Available Books</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 sm:pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              {<form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => onChangeFilters(section.name, option.value, e)}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>}

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {books.map((product) => (
                    <div key={product.id} className="group relative" onClick={(e) => {e.stopPropagation(); setShowInfoDialog(!showInfoDialog)}}>
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.image !== '' ? product.image : placeholder}
                          alt={product.imageAlt}
                          className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span aria-hidden="true" className="absolute " />
                              {product.subject}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                          <p className="text-sm font-medium text-gray-900">{product.grade}</p>
                        </div>
                        <button 
                          onClick={(e) => onRequestBook(e, product)}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Request
                        </button>
                        <RequestBookDialog 
                          showRequestDialog={showRequestDialog} 
                          toggleRequestDialog={() => setShowRequestDialog(false)} 
                          submiteRequestDetails={submiteRequestDetails}
                        />
                        <BookInfoDialog 
                          showInfoDialog={showInfoDialog} 
                          toggleInfoDialog={() => setShowInfoDialog(false)} 
                          book={product}
                        />
                      </div>
                    </div>
                  ))}
                  {books.length === 0 && <h2 id="products-heading">
                    No Books Available
                  </h2>}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )

};

export default HomePage;
