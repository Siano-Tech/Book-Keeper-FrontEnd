import React from 'react';

export const AboutPage = () => {

    const subCategories = [
        { name: 'Totes', href: '#' },
        { name: 'Backpacks', href: '#' },
        { name: 'Travel Bags', href: '#' },
        { name: 'Hip Bags', href: '#' },
        { name: 'Laptop Sleeves', href: '#' },
    ]

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">About Us</h1>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 sm:pt-6">
                <div className="">
                    "This free books depository is a first of it's kind facility that plays a pivotal role in providing all
                    students a platform to hand over their used and immensely valuable textbooks, notebooks, guides,
                    old question papers, study material, references etc., to students of the younger grades, <b><i>absolutely
                    free of cost</i></b>, instead of discarding it in a wasteful manner or not knowing what to do with it at the
                    end of the academic year. Thereby, providing the receiving student a portal to finally get treasured
                    study material from their seniors being just a click away.
                </div>
                <div className="mt-2">
                    This idea has arisen from the struggle of procuring  desperately needed study material faced by myself and many more students over the years."
                </div>
                <h1 className='mt-5 color-primary text-xl'>- Anjan Bhat</h1>
                <div className='mt-2'>
                    Disclaimer:
                    <span>
                        <ul>
                            <li>* Bishop Cotton Boys' School and its administration is Not responsible for this books exchange process.</li>
                            <li>* Pick-up/delivery shall be the Receiver's responsibility.</li>
                            <li>* This is a student friendly platform only to connect receivers and donors.</li>
                        </ul>
                    </span>
                </div>
            </section>
        </main>
    )
}