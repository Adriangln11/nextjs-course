import { redirect } from 'next/navigation'
import api, { Book } from './api'
import { Card } from './components/Card'
import SearchBox from './components/SearchBox'

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const books = await api.search(searchParams.q)

  async function searchAction(formData: FormData) {
    'use server'

    redirect(`/?q=${formData.get('query')}`)
  }
  return (
    <main className='w-full flex flex-col h-max'>
      <form action={searchAction} className='inline-flex gap-2 mb-4'>
        <input
          defaultValue={searchParams.q || ''}
          className='px-2'
          name='query'
        />
        <button type='submit' className='p-2 bg-white/20'>
          Search
        </button>
      </form>
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
        {books.map((book) => {
          return (
            <Card
              key={book.id}
              id={book.id}
              name={book.name}
              description={book.description}
              url={book.url}
            />
          )
        })}
      </section>
    </main>
  )
}
