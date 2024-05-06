import { useContext, useEffect, useState } from "react";
import { ThreeCircles } from 'react-loader-spinner';
import classNames from "classnames";
import { AppContext } from "../App";
import { updateChapter } from "../api";
import { randomNumberGenerate } from "../helpers";
import { ReactComponent as IconClose } from '../icons/close.svg';
import { ReactComponent as IconEdit } from '../icons/edit.svg';
import { ReactComponent as IconAdd } from '../icons/add.svg';

function Modal({ book, openedBook, openedIndexBook }) {
    const [isTyping, setIsTyping] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [chapters, setChapters] = useState([]);
    const [selectInput, setSelectInput] = useState("");

    const [resetBook, onOpenBook] = useContext(AppContext);

    const onSelectChapter = index => setSelectedChapter(selectedChapter === index ? null : index);

    const onEditClick = () => {
        setIsTyping(true);
        setEditValue(book[selectedChapter + 1]);
    }

    const onAddNewClick = () => {
        setIsSelect(true);
        if (editValue) setEditValue("");
        setIsTyping(true);
    }
    const onButtonSaveClick = type => {
        setIsLoading(true);
        let tempInput = selectInput;
        if (type === 'add' && !selectInput) {
            tempInput = document.querySelector('#select-chapter').firstElementChild.value;
        }
        const formData = { [`${type === 'edit' ? selectedChapter + 1 : tempInput}`]: editValue };
        updateChapter(openedBook.testament, openedBook.name, formData)
            .then(data => {
                console.log('PATCH_DATA: ', data);
                onOpenBook(openedBook, openedIndexBook);
            })
            .finally(() => {
                setEditValue('');
                setIsTyping(false);
                setSelectedChapter(null);
                setIsLoading(false);
                if (isSelect) setIsSelect(false);
                if (selectInput) setSelectInput('');
            });
    }

    const modalReset = () => {
        setSelectedChapter(null);
        setEditValue('');
        setIsTyping(false);
        resetBook();
    }

    const onBackdropClick = e => {
        if (e.target === e.currentTarget && !isTyping) {
            modalReset();
        }
    }

    useEffect(() => {
        if (openedBook.chapters) {
            setChapters(Array.from({ length: openedBook.chapters }, (_, index) => index + 1));
        } else {
            setChapters([]);
        }
    }, [openedBook])

    return <div
                className={
                    classNames('absolute inset-0 z-1',
                        { visible: JSON.stringify(book).length > 2 && openedBook.chapters }
                    )
                }
                id="backdrop"
                onClick={onBackdropClick}
            >
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
                <div className="modal book-view absolute overflow-scroll">
                    <div className="toolbar flex justify-between mb-3">
                        <h3 className="text-left font-medium pl-[68px] py-4">{book['Книга']}</h3>
                        <div className="btn-container flex items-center">
                            {isSelect && 
                                <label className="mr-3">Розділ: 
                                    <select 
                                        id="select-chapter"
                                        className="ml-1"
                                        onChange={(e) => setSelectInput(e.target.value)} value={selectInput}
                                    >
                                        {chapters.map(chapter => book[chapter] ? null : <option key={chapter + Date.now()}>{chapter}</option>)}
                                    </select>
                                </label>
                            }
                            {isTyping && 
                                <>
                                    <button
                                        disabled={(editValue === book[selectedChapter + 1] && !isSelect) || (isSelect && !editValue)}
                                        className={classNames('fit-content px-3 py-3 mr-3 rounded-sm btn-save', {
                                            hidden: (editValue === book[selectedChapter + 1] && !isSelect) || (isSelect && !editValue)
                                        })}
                                        style={{
                                            background: `rgba(${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},${randomNumberGenerate(200, 255)},0.7)`
                                        }}
                                        onClick={() => onButtonSaveClick(isSelect ? 'add' : 'edit')}
                                    >
                                        Зберегти зміни
                                    </button>
                                    <button
                                        className="fit-content px-3 py-3 mr-3 rounded-sm"
                                        style={{background: 'rgba(230,230,230,0.7)'}}
                                        onClick={() => {
                                            setIsTyping(false);
                                            if (isSelect) setIsSelect(false);
                                            if (selectInput) setSelectInput('');
                                        }}
                                    >
                                        Відмінити
                                    </button>
                                </>
                            }
                            {selectedChapter !== null
                                ?   <button className="btn-edit" onClick={onEditClick} disabled={isTyping}>
                                        <IconEdit />
                                    </button>
                                :   <button className="btn-add" onClick={onAddNewClick} disabled={isTyping}>
                                        <IconAdd />
                                    </button>
                            }
                        </div>
                    </div>
                    <div className="relative z-10">
                        <textarea
                            className={classNames('absolute w-full h-52 rounded-lg p-5', {hidden: !isTyping})}
                            id="edit-textarea"
                            onChange={e => setEditValue(e.target.value)}
                            value={editValue}
                        ></textarea>
                    </div>
                    <ul className={classNames("chapter-list", {'opacity-20': isTyping})}>
                         {chapters.length && chapters.map((chapter, index) =>
                            book[chapter] ?
                                <li 
                                    key={index + Date.now()}
                                    className={classNames("flex p-5 rounded-lg cursor-default", {selected: index === selectedChapter && !isTyping})}
                                    onClick={() => onSelectChapter(index)}
                                >
                                    <p className="block min-w-12 text-center">
                                        {chapter}
                                    </p>
                                    <p className="text-justify pr-7">{book[chapter]}</p>
                                </li> : null
                        )}
                    </ul>
                </div>
                <button className="btn-close absolute" onClick={modalReset}><IconClose /></button>
            </div>
}

export default Modal;