import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Descriptions, Tag, Button } from 'antd'
import charactersService from '../../services/characters-service'
import { showNotification } from '../../common/notification'
import lang from '../../i18n/lang.json'

interface CharactersState {
    loading: Boolean
    characterDetail: any
}
const CharacterDetail = () => {
    const initalState: CharactersState = {
        loading: true,
        characterDetail: null,
    }

    const [state, setState] = useState(initalState)

    const id = () => {
        return window.location.pathname.split('/characters/')[1]
    }

    const fetchData = async () => {
        try {
            const characterDetail = await charactersService.getCharacterDetail(
                id()
            )
            setState((s) => ({ ...s, characterDetail, loading: false }))
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

    const goBack = () => {
        window.history.back()
    }

    const { characterDetail: character } = state

    return (
        <div className='container-app'>
            <h2>{lang.characters.title_detail}</h2>
            <Button className='btn-back' type='primary' onClick={goBack}>
                {lang.button.back}
            </Button>
            <Descriptions
                title={`${lang.characters.name}: ${character?.name}`}
                bordered
            >
                <Descriptions.Item label={lang.characters.gender}>
                    {character?.gender}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.culture}>
                    {character?.culture}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.born}>
                    {character?.born}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.father}>
                    {character?.father}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.mother}>
                    {character?.mother}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.died}>
                    {character?.died}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.spouse}>
                    {character?.spouse}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.playedBy} span={2}>
                    {character?.playedBy.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.titles}>
                    {character?.titles.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.tvSeries} span={2}>
                    {character?.tvSeries.map((val: string, i: number) => (
                        <Tag color='magenta' key={i}>
                            {val}
                        </Tag>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.allegiances}>
                    {character?.allegiances.map((val: string, i: number) => (
                        <Link
                            to={`/houses/${val.split('/houses/')[1]}`}
                            key={i}
                        >
                            <Tag color='cyan'>{val.split('/houses/')[1]}</Tag>
                        </Link>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.aliases} span={2}>
                    {character?.aliases.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.books}>
                    {character?.books.map((val: string, i: number) => (
                        <Link to={`/books/${val.split('/books/')[1]}`} key={i}>
                            <Tag color='green'>{val.split('/books/')[1]}</Tag>
                        </Link>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.characters.povBooks} span={2}>
                    {character?.povBooks.map((val: string, i: number) => (
                        <Link to={`/books/${val.split('/books/')[1]}`} key={i}>
                            <Tag color='geekblue'>
                                {val.split('/books/')[1]}
                            </Tag>
                        </Link>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default CharacterDetail
