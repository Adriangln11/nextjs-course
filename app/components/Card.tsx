import Link from 'next/link'
import React from 'react'

interface Props {
  id: string
  name: string
  description: string
  url: string
}

export const Card: React.FC<Props> = ({ name, id, description, url }) => {
  return (
    <div>
      <article
        key={id}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      >
        <div className='w-80 h-fit p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <Link href={id} className='text-zinc-50' prefetch={false}>
            {id}
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {name}
            </h5>
          </Link>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap'>
            {description}
          </p>
          <a
            href={url}
            target='_blank'
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Shop Now!
          </a>
        </div>
      </article>
    </div>
  )
}
