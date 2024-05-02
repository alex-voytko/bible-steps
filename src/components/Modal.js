import classNames from "classnames";
import { useContext } from "react";
import { AppContext } from "../App";
import { ReactComponent as IconClose } from '../icons/close.svg';

function Modal({ book, chapters }) {
    const resetBook = useContext(AppContext)

    const onBackdropClick = e => {
        if (e.target === e.currentTarget) {
            resetBook()
        }
    }

    return <div
                className={
                    classNames('absolute inset-0 z-1',
                        { visible: JSON.stringify(book).length > 2 && chapters }
                    )
                }
                id="backdrop"
                onClick={onBackdropClick}
            >
                <div className="modal book-view absolute overflow-scroll">
                    <h3 className="text-center">Книга: {book['Книга']}</h3>
                    <ul className="chapter-list">
                {chapters && Array(chapters).fill('').map((_, index) =>
                            book[index + 1] ?
                            <li key={index + Date.now()} className="flex mt-3">
                                <p className="block min-w-8">
                                    {index + 1}
                                </p>
                                <p className="text-justify pr-7">{book[index + 1]}</p>
                            </li> : null
                        )}
                    </ul>
                </div>
                <button className="btn-close absolute" onClick={resetBook}><IconClose /></button>
            </div>
}

export default Modal;