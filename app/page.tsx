import api, { Book } from './api'
import { Card } from './components/Card'
import SearchBox from './components/SearchBox'

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const books = await api.search(searchParams.q)
  return (
    <main className='w-full flex flex-col h-max'>
      <SearchBox />
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
