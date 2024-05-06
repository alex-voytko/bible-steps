import React, { useState, useEffect, createContext } from 'react';
import { ThreeCircles } from 'react-loader-spinner'
import { randomNumberGenerate } from './helpers';
import { fetchBookNotations } from './api';
import data from './data/book-list.json'
import AppBar from './components/AppBar';
import Modal from './components/Modal';

export const AppContext = createContext();

function App() {
  const [oldTestament, setOldTestament] = useState([]);
  const [newTestament, setNewTestament] = useState([]);
  const [fetchedBookData, setFetchedBookData] = useState({});
  const [openedBook, setOpenedBook] = useState({});
  const [openedIndexBook, setOpenedIndexBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(openedBook)

  const onOpenBook = (book, bookIndex) => {
    setIsLoading(true);
    fetchBookNotations(book, bookIndex)
      .then(data => {
        setFetchedBookData(data[0]);
        setOpenedBook(book);
        setOpenedIndexBook(bookIndex);
      })
      .finally(() => setIsLoading(false));
  }

  const resetBook = () => {
    setFetchedBookData({});
    setOpenedBook({});
    setOpenedIndexBook(null);
  }

  useEffect(() => {
    setOldTestament(data.books.filter(book => book.testament === 'old'));
    setNewTestament(data.books.filter(book => book.testament === 'new'));
  }, [])

  return (
    <AppContext.Provider value={[resetBook, onOpenBook]}>
      {isLoading &&
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="white"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner-wrapper"
        />
      }
      <AppBar />
      <div className="app px-10 py-3">
        <div className='flex page-width'>
          <div className='w-1/2'>
              <h2 className='text-center py-5 font-medium text-gray-500'>Старий завіт:</h2>
              <ul className='book-list flex justify-center gap-3 flex-wrap'>
                {oldTestament.map((book, index) =>
                  <li
                    style={{
                      background:
                        `rgba(${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},0.7)`
                    }}
                    key={book.name}
                    className='book-list__item fit-content px-3 py-3 inline-block cursor-pointer rounded-sm'
                    onClick={() => onOpenBook(book, index)}
                  >
                    {book.name}
                  </li>
                )}
              </ul>
          </div>
          <div className='w-1/2'>
            <h2 className='text-center py-5 font-medium text-gray-500'>Новий завіт:</h2>
            <ul className='book-list flex justify-center gap-3 flex-wrap'>
                {newTestament.map((book, index) =>
                  <li
                    style={{
                      background:
                        `rgba(${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},0.7)`
                    }}
                    key={book.name}
                    className='book-list__item fit-content px-3 py-3 inline-block cursor-pointer rounded-sm'
                    onClick={() => onOpenBook(book, index)}
                  >
                    {book.name}
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
      <Modal book={fetchedBookData} openedBook={openedBook} openedIndexBook={openedIndexBook} />
    </AppContext.Provider>
  );
}

export default App;
