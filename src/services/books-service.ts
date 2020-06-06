import axios from 'axios'
import apiConstant from '../configurations/api-constants'
const idExpr = '{id}'

const booksService = {
    /**
     * Get Books List
     */
    getBooks: async () => {
        const resp = await axios.get(apiConstant.BooksListURI)
        return resp.data
    },
    /**
     * Get detail Books
     */
    getBookDetail: async (id: string) => {
        const resp = await axios.get(
            apiConstant.BookDetailURI.replace(idExpr, id)
        )

        return resp.data
    },
}
export default booksService
