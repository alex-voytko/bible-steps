const baseURL = 'https://sheetdb.io/api/v1/stmwtbnd73kku';

const fetchBookNotations = (book, bookIndex) =>
    fetch(baseURL + '?limit=1&sheet=' + book.testament + '&offset=' + bookIndex)
        .then(response => response.json());

const updateChapter = (testament, bookName, data) =>
    fetch(baseURL + '/Книга/' + bookName +'?sheet=' + testament, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: [data]})
    })
    .then((response) => response.json());
    
export {fetchBookNotations, updateChapter}