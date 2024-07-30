export const filters = [
    {
        id: 'book-type',
        name: 'Type of Book',
        options: [
            { value: 'Textbook', label: 'Textbook', checked: false },
            { value: 'Notebook', label: 'Notebook', checked: false },
            { value: 'Guide', label: 'Guide', checked: false },
            { value: 'Stationary', label: 'Stationary', checked: false },
            { value: 'Question Bank', label: 'Question Bank', checked: false },
            { value: 'Question Paper', label: 'Question Paper', checked: false },
            { value: 'Others', label: 'Others', checked: false },
        ],
    },
    {
        id: 'grade',
        name: 'Grade',
        options: [
            { value: '12', label: '12', checked: false },
            { value: '11', label: '11', checked: false },
            { value: '10', label: '10', checked: false },
            { value: '9', label: '9', checked: false },
            { value: '8', label: '8', checked: false },
            { value: '7', label: '7', checked: false },
            { value: '6', label: '6', checked: false },
            { value: '5', label: '5', checked: false },
            { value: '4', label: '4', checked: false },
            { value: '3', label: '3', checked: false },
            { value: '2', label: '2', checked: false },
            { value: '1', label: '1', checked: false },
            { value: 'UKG', label: 'UKG', checked: false },
            { value: 'LKG', label: 'LKG', checked: false },
        ],
    },
    {
        id: 'subject',
        name: 'Subject',
        options: [
            { value: 'maths', label: 'Maths', checked: false },
            { value: 'science', label: 'Science', checked: false },
            { value: 'physics', label: 'Physics', checked: false },
            { value: 'chemistry', label: 'Chemistry', checked: false },
            { value: 'biology', label: 'Biology', checked: false },
            { value: 'social', label: 'Social', checked: false },
        ],
    },
    // {
    //   id: 'size',
    //   name: 'Size',
    //   options: [
    //     { value: '2l', label: '2L', checked: false },
    //     { value: '6l', label: '6L', checked: false },
    //     { value: '12l', label: '12L', checked: false },
    //     { value: '18l', label: '18L', checked: false },
    //     { value: '20l', label: '20L', checked: false },
    //     { value: '40l', label: '40L', checked: true },
    //   ],
    // },
]

export const products = [
    {
        id: 1,
        subject: 'Physics',
        href: '#',
        grade: '10th G',
        image: 'https://rukminim2.flixcart.com/image/850/1000/kpcy5jk0/regionalbooks/1/v/7/s-chand-physics-class-10-original-imag3hxxvm26ydyd.jpeg?q=90&crop=false',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        subject: 'Biology',
        href: '#',
        grade: '9th G',
        image: 'https://rukminim2.flixcart.com/image/850/1000/kpcy5jk0/regionalbooks/j/8/7/s-chand-biology-class-10-original-imag3hxvrquvhgqz.jpeg?q=90&crop=false',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        subject: 'Chemistry',
        href: '#',
        grade: '7th G',
        image: 'https://www.malikbooksellers.com/wp-content/uploads/2022/11/Science-for-class-10-part-2.png',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        subject: 'Social Sciences',
        href: '#',
        grade: '10th G',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgD60R9qLIkzPlhu7OvQ6CgmhYM2agMiiOQ&s',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
]

export const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    // { name: 'Price: Low to High', href: '#', current: false },
    // { name: 'Price: High to Low', href: '#', current: false },
]

export const subCategories = [
    // { name: 'Totes', href: '#' },
    // { name: 'Backpacks', href: '#' },
    // { name: 'Travel Bags', href: '#' },
    // { name: 'Hip Bags', href: '#' },
    // { name: 'Laptop Sleeves', href: '#' },
]

