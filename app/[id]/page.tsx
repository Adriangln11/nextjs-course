import api, { Book } from '../api'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}) {
  const book = await api.fetch(id)

  return {
    title: `${book.name} - Books`,
    description: `${book.description} description`,
  }
}

export async function generateStaticParams() {
  const books = await api.list()

  return books.map((book) => {
    id: book.id
  })
}

export default async function BookPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const book = await api.fetch(id)
  return (
    <main className='w-full flex flex-col h-max'>
      <section
        key={book.name}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      >
        <div className='w-80 h-fit p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <a href='#'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {book.name}
            </h5>
          </a>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap'>
            {book.description}
          </p>
          <a
            href={book.url}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Shop Now!
          </a>
        </div>
      </section>
    </main>
  )
}
