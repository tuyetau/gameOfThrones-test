const RootAPI = process.env.ROOT_API || 'https://anapioficeandfire.com/api'

const apiConstant = Object.freeze({
    // Characters
    CharactersListURI: `${RootAPI}/characters`,
    CharacterDetailURI: `${RootAPI}/characters/{id}`,
    // Books
    BooksListURI: `${RootAPI}/books`,
    BookDetailURI: `${RootAPI}/books/{id}`,
    // Houses
    HousesListURI: `${RootAPI}/houses`,
    HouseDetailURI: `${RootAPI}/houses/{id}`,
})

export default apiConstant
