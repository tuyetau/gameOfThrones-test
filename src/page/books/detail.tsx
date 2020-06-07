import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Descriptions, Tag, Button } from 'antd'
import booksService from '../../services/books-service'
import { showNotification } from '../../common/notification'
import lang from '../../i18n/lang.json'

interface CharactersState {
    loading: Boolean
    bookDetail: any
}
const BookDetail = () => {
    const initalState: CharactersState = {
        loading: true,
        bookDetail: null,
    }

    const [state, setState] = useState(initalState)

    const id = () => {
        return window.location.pathname.split('/books/')[1]
    }

    const fetchData = async () => {
        try {
            const bookDetail = await booksService.getBookDetail(id())
            setState((s) => ({ ...s, bookDetail, loading: false }))
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

    const goBack = () => {
        window.history.back()
    }

    const { bookDetail: book } = state

    return (
        <div className='container-app'>
            <h2>{lang.books.title_detail}</h2>
            <Button className='btn-back' type='primary' onClick={goBack}>
                {lang.button.back}
            </Button>
            <Descriptions title={`${lang.books.name}: ${book?.name}`} bordered>
                <Descriptions.Item label={lang.books.country}>
                    {book?.country}
                </Descriptions.Item>
                <Descriptions.Item label='Isbn'>{book?.isbn}</Descriptions.Item>
                <Descriptions.Item label={lang.books.mediaType}>
                    {book?.mediaType}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.numberOfPages}>
                    {book?.numberOfPages}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.publisher}>
                    {book?.publisher}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.released}>
                    {book?.released}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.authors}>
                    {book?.authors.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.povCharacters} span={2}>
                    {book?.povCharacters.map((val: string, i: number) => (
                        <Link
                            to={`/characters/${val.split('/characters/')[1]}`}
                            key={i}
                        >
                            <Tag color='cyan'>
                                {val.split('/characters/')[1]}
                            </Tag>
                        </Link>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.books.characters}>
                    {book?.characters.map((val: string, i: number) => (
                        <Link
                            to={`/characters/${val.split('/characters/')[1]}`}
                            key={i}
                        >
                            <Tag color='magenta'>
                                {val.split('/characters/')[1]}
                            </Tag>
                        </Link>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default BookDetail
