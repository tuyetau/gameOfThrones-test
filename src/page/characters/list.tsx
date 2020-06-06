import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import charactersService from '../../services/characters-service'
import { showNotification } from '../../common/notification'
import lang from '../../i18n/lang.json'
import { Tag } from 'antd'

const { SearchBar } = Search

interface CharactersState {
    loading: Boolean
    charactersList: Array<any>
}

const CharactersList = () => {
    const initalState: CharactersState = {
        loading: true,
        charactersList: [],
    }

    const [state, setState] = useState(initalState)

    const fetchData = async () => {
        try {
            const charactersList = await charactersService.getCharacters()
            setState((s) => ({ ...s, charactersList, loading: false }))
        } catch (error) {
            showNotification()
        }
    }

    useEffect(() => {
        if (state.loading) {
            fetchData()
        }
    }, [])

    if (state.loading) {
        return <div className='loader' />
    }

    const columns = [
        {
            text: lang.characters.name,
            dataField: 'name',
            key: 'name',
            formatter: (cell: any, row: any) => {
                return (
                    <Link
                        to={`/characters/${row.url.split('/characters/')[1]}`}
                    >
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.characters.gender,
            dataField: 'gender',
            key: 'gender',
            formatter: (cell: any, row: any) => {
                return (
                    <Link
                        to={`/characters/${row.url.split('/characters/')[1]}`}
                    >
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.characters.culture,
            dataField: 'culture',
            key: 'culture',
        },
        {
            text: lang.characters.allegiances,
            dataField: 'allegiances',
            key: 'allegiances',
            formatter: (cell: any, row: any) => {
                return (
                    <div>
                        {cell?.map((val: string, i: number) => {
                            return (
                                <Tag color='volcano' key={i}>
                                    <Link
                                        to={`/houses/${
                                            val.split('/houses/')[1]
                                        }`}
                                    >
                                        {val.split('/houses/')[1]}
                                    </Link>
                                </Tag>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            text: lang.characters.books,
            dataField: 'books',
            key: 'books',
            formatter: (cell: any, row: any) => {
                return (
                    <div>
                        {cell?.map((val: string, i: number) => {
                            return (
                                <Tag color='cyan' key={i}>
                                    <Link
                                        to={`/books/${val.split('/books/')[1]}`}
                                    >
                                        {val.split('/books/')[1]}
                                    </Link>
                                </Tag>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            text: lang.characters.died,
            dataField: 'died',
            key: 'died',
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
                value: state.charactersList.length,
            },
        ],
        showTotal: true,
    }
    return (
        <div className='container-app'>
            <h2>{lang.characters.title_list}</h2>
            <ToolkitProvider
                keyField='url'
                data={state.charactersList}
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

export default CharactersList
