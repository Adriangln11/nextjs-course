export interface Book {
  id: string | number
  name: string
  author: string
  year: number | string
  description: string
  url: string
}
const books: Book[] = [
  {
    id: '1',
    name: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    description:
      'A complex and detailed epic of interstellar intrigue, the noble houses of a feudalistic interstellar society, and the politics of a future human empire.',
    url: 'https://www.amazon.com/Dune-Frank-Herbert/dp/0441172717',
  },
  {
    id: '2',
    name: 'Foundation',
    author: 'Isaac Asimov',
    year: 1951,
    description:
      'The story of a group of scientists who seek to preserve knowledge and save humanity in the wake of the fall of the Galactic Empire.',
    url: 'https://www.amazon.com/Foundation-Isaac-Asimov/dp/0553293354',
  },
  {
    id: '3',
    name: '1984',
    author: 'George Orwell',
    year: 1949,
    description:
      'A dystopian novel set in a totalitarian society, where the government constantly manipulates the truth and invades the privacy of its citizens.',
    url: 'https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934',
  },
  {
    id: '4',
    name: 'Brave New World',
    author: 'Aldous Huxley',
    year: 1932,
    description:
      'A futuristic novel that explores the dangers of a utopian society that prioritizes pleasure and conformity over individuality and freedom.',
    url: 'https://www.amazon.com/Brave-New-World-Aldous-Huxley/dp/0060850523',
  },
  {
    id: '5',
    name: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    year: 1979,
    description:
      'A comedic science fiction series that follows the misadventures of an ordinary human who is swept off Earth moments before it is destroyed.',
    url: 'https://www.amazon.com/Hitchhikers-Guide-Galaxy-Douglas-Adams/dp/0345391802',
  },
  {
    id: '6',
    name: 'Neuromancer',
    author: 'William Gibson',
    year: 1984,
    description:
      'A cyberpunk novel that explores the blurred boundaries between humans and artificial intelligence in a dystopian future.',
    url: 'https://www.amazon.com/Neuromancer-William-Gibson/dp/0441569595',
  },
  {
    id: '7',
    name: "Ender's Game",
    author: 'Orson Scott Card',
    year: 1985,
    description:
      'A military science fiction novel that follows the story of Andrew "Ender" Wiggin as he trains in a battle school to fight against an alien species.',
    url: 'https://www.amazon.com/Enders-Game-Orson-Scott-Card/dp/0812550706',
  },
  {
    id: '8',
    name: 'The War of the Worlds',
    author: 'H.G. Wells',
    year: 1898,
    description:
      'A science fiction novel that depicts an alien invasion of Earth and explores the themes of imperialism and the resilience of humanity.',
    url: 'https://www.amazon.com/War-Worlds-H-G-Wells/dp/1515429041',
  },
  {
    id: '9',
    name: 'Snow Crash',
    author: 'Neal Stephenson',
    year: 1992,
    description:
      'A postcyberpunk novel that combines elements of science fiction, history, and linguistics in a near-future world.',
    url: 'https://www.amazon.com/Snow-Crash-Neal-Stephenson/dp/0553380958',
  },
  {
    id: '10',
    name: 'The Martian',
    author: 'Andy Weir',
    year: 2011,
    description:
      'A hard science fiction novel that follows the story of an astronaut stranded on Mars and his struggle for survival.',
    url: 'https://www.amazon.com/Martian-Andy-Weir/dp/0553418025',
  },
  {
    id: '11',
    name: 'I, Robot',
    author: 'Isaac Asimov',
    year: 1950,
    description:
      'A collection of science fiction short stories that explore the relationships between humans and robots.',
    url: 'https://www.amazon.com/Robot-Isaac-Asimov/dp/055338256X',
  },
  {
    id: '12',
    name: "The Handmaid's Tale",
    author: 'Margaret Atwood',
    year: 1985,
    description:
      'A dystopian novel set in a totalitarian society where women are subjugated and used for reproductive purposes.',
    url: 'https://www.amazon.com/Handmaids-Tale-Margaret-Atwood/dp/038549081X',
  },
  {
    id: '13',
    name: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    description:
      'A dystopian novel that depicts a future society where books are outlawed and burned to suppress dissenting ideas.',
    url: 'https://www.amazon.com/Fahrenheit-451-Novel-Ray-Bradbury/dp/1451673310',
  },
  {
    id: '14',
    name: 'The Hunger Games',
    author: 'Suzanne Collins',
    year: 2008,
    description:
      'A dystopian novel set in a post-apocalyptic society where teenagers are forced to participate in a televised fight to the death.',
    url: 'https://www.amazon.com/Hunger-Games-Suzanne-Collins/dp/0439023483',
  },
]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const api = {
  list: async (): Promise<Book[]> => {
    const [, ...data] = await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNhjyfZPqQQmFfVY4uOYDBX8wXtSAAuQpTAg0qdbEsyqIAI7xFTL5m__N5B547TRkmFnBOCMClZicm/pub?gid=0&single=true&output=csv',
      { cache: 'no-store' }
    )
      .then((res) => res.text())
      .then((text) => text.split('\n'))

    const books: Book[] = data.map((row) => {
      const [id, name, author, year, description, url] = row.split(',')
      return { id, name, author, year, description, url }
    })

    return books
  },
  fetch: async (id: Book['id']): Promise<Book> => {
    await sleep(2000)
    const book = books.find((book) => book.id == id)
    if (!book) throw new Error('Book not found')
    return book
  },
  search: async (query: string): Promise<Book[]> => {
    const results = await api
      .list()
      .then((books) =>
        books.filter((book) =>
          book.name.toLowerCase().includes(query.toLowerCase())
        )
      )

    return results
  },
}
export default api
