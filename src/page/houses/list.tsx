import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { showNotification } from '../../common/notification'
import housesService from '../../services/houses-service'
import lang from '../../i18n/lang.json'
import { Tag } from 'antd'

const { SearchBar } = Search

interface CharactersState {
    loading: Boolean
    housesList: Array<any>
}

const HousesList = () => {
    const initalState: CharactersState = {
        loading: true,
        housesList: [],
    }

    const [state, setState] = useState(initalState)

    const fetchData = async () => {
        try {
            const housesList = await housesService.getHouses()
            setState((s) => ({ ...s, housesList, loading: false }))
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
            text: lang.houses.name,
            dataField: 'name',
            key: 'name',
            formatter: (cell: any, row: any) => {
                return (
                    <Link to={`/houses/${row.url.split('/houses/')[1]}`}>
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.houses.region,
            dataField: 'region',
            key: 'region',
            formatter: (cell: any, row: any) => {
                return (
                    <Link to={`/houses/${row.url.split('/houses/')[1]}`}>
                        {cell}
                    </Link>
                )
            },
        },
        {
            text: lang.houses.words,
            dataField: 'words',
            key: 'words',
        },
        {
            text: lang.houses.overLord,
            dataField: 'overlord',
            key: 'overlord',
            formatter: (cell: any, row: any) => {
                return (
                    cell && (
                        <Tag color='purple'>
                            <Link to={`/houses/${cell?.split('/houses/')[1]}`}>
                                {cell?.split('/houses/')[1]}
                            </Link>
                        </Tag>
                    )
                )
            },
        },
        {
            text: lang.houses.currentLord,
            dataField: 'currentLord',
            key: 'currentLord',
            formatter: (cell: any, row: any) => {
                return (
                    cell && (
                        <Tag color='cyan'>
                            <Link
                                to={`/characters/${
                                    cell?.split('/characters/')[1]
                                }`}
                            >
                                {cell?.split('/characters/')[1]}
                            </Link>
                        </Tag>
                    )
                )
            },
        },
        {
            text: lang.houses.swornMembers,
            dataField: 'swornMembers',
            key: 'swornMembers',
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
                value: state.housesList.length,
            },
        ],
        showTotal: true,
    }
    return (
        <div className='container-app'>
            <h2>{lang.houses.title_list}</h2>
            <ToolkitProvider
                keyField='url'
                data={state.housesList}
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

export default HousesList
