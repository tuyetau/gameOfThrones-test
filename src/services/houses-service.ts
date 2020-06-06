import axios from 'axios'
import apiConstant from '../configurations/api-constants'
const idExpr = '{id}'

const housesService = {
    /**
     * Get Books List
     */
    getHouses: async () => {
        const resp = await axios.get(apiConstant.HousesListURI)
        return resp.data
    },
    /**
     * Get detail Books
     */
    getHouseDetail: async (id: string) => {
        const resp = await axios.get(
            apiConstant.HouseDetailURI.replace(idExpr, id)
        )

        return resp.data
    },
}
export default housesService
