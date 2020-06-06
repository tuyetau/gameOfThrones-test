import axios from 'axios'
import apiConstant from '../configurations/api-constants'
const idExpr = '{id}'

const charactersService = {
    /**
     * Get characters List
     */
    getCharacters: async () => {
        const resp = await axios.get(apiConstant.CharactersListURI)
        return resp.data
    },
    /**
     * Get detail characters
     */
    getCharacterDetail: async (id: string) => {
        const resp = await axios.get(
            apiConstant.CharacterDetailURI.replace(idExpr, id)
        )

        return resp.data
    },
}
export default charactersService
