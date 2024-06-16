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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [minMaxColorVal, setMinMaxColorVal] = useState([200, 255]);

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
    if (localStorage.getItem('is-dark') === '1') {
      setIsDarkTheme(true);
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(openedBook) === '{}') {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }, [openedBook]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('is-dark');
      setMinMaxColorVal([10, 55]);
      localStorage.setItem('is-dark', '1');
    } else {
      document.body.classList.remove('is-dark');
      setMinMaxColorVal([200, 255]);
      localStorage.removeItem('is-dark');
    }
  }, [isDarkTheme]);

  return (
    <AppContext.Provider value={{ resetBook, onOpenBook, isDarkTheme, setIsDarkTheme }}>
      {isLoading &&
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color={isDarkTheme ? 'grey' : 'white'}
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
                      `rgba(${randomNumberGenerate(minMaxColorVal)},${randomNumberGenerate(minMaxColorVal)},${randomNumberGenerate(minMaxColorVal)},0.7)`
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
                      `rgba(${randomNumberGenerate(minMaxColorVal)},${randomNumberGenerate(minMaxColorVal)},${randomNumberGenerate(minMaxColorVal)},0.7)`
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
      <Modal book={fetchedBookData} openedBook={openedBook} openedIndexBook={openedIndexBook} minMax={minMaxColorVal} />
    </AppContext.Provider>
  );
}

export default App;
