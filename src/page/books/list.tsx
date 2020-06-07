import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { showNotification } from '../../common/notification'
import booksService from '../../services/books-service'
import lang from '../../i18n/lang.json'
import { Tag } from 'antd'

const { SearchBar } = Search

interface CharactersState {
    loading: boolean
    booksList: Array<any>
}

const BooksList = () => {
    const initalState: CharactersState = {
        loading: true,
        booksList: [],
    }

    const [state, setState] = useState(initalState)

    const fetchData = async () => {
        try {
            const booksList = await booksService.getBooks()
            setState((s) => ({ ...s, booksList, loading: false }))
        } catch (error) {
            showNotification()
        }
    }

    useEffect(() => {
        if (state.loading) {
            fetchData()
        }
    })

    if (state.loading) {
        return <div className='loader' />
    }

    const columns = [
        {
            text: lang.books.name,
            dataField: 'name',
            key: 'name',
            formatter: (cell: any, row: any) => {
                return (
                    <Link to={`/books/${row.url.split('/books/')[1]}`}>
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.books.country,
            dataField: 'country',
            key: 'country',
            formatter: (cell: any, row: any) => {
                return (
                    <Link to={`/books/${row.url.split('/books/')[1]}`}>
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.books.mediaType,
            dataField: 'mediaType',
            key: 'mediaType',
        },
        {
            text: lang.books.publisher,
            dataField: 'publisher',
            key: 'publisher',
        },
        {
            text: lang.books.released,
            dataField: 'released',
            key: 'released',
        },
        {
            text: lang.books.povCharacters,
            dataField: 'povCharacters',
            key: 'povCharacters',
            formatter: (cell: any, row: any) => {
                return (
                    <div>
                        {cell?.map((val: string, i: number) => {
                            return (
                                <Tag color='volcano' key={i}>
                                    <Link
                                        to={`/characters/${
                                            val.split('/characters/')[1]
                                        }`}
                                    >
                                        {val.split('/characters/')[1]}
                                    </Link>
                                </Tag>
                            )
                        })}
                    </div>
                )
            },
        },
    ]
    const options = {
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: 'All',
                value: state.booksList.length,
            },
        ],
        showTotal: true,
    }
    return (
        <div className='container-app'>
            <h2>{lang.books.title_list}</h2>
            <ToolkitProvider
                keyField='url'
                data={state.booksList}
                columns={columns}
                search
            >
                {(props) => (
                    <div>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                            {...props.baseProps}
                            pagination={paginationFactory(options)}
                            bordered={false}
                            hover
                        />
                    </div>
                )}
            </ToolkitProvider>
        </div>
    )
}

export default BooksList
