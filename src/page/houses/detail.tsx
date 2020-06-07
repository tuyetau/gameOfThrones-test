import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Descriptions, Tag, Button } from 'antd'
import { showNotification } from '../../common/notification'
import lang from '../../i18n/lang.json'
import housesService from '../../services/houses-service'

interface CharactersState {
    loading: Boolean
    houseDetail: any
}
const HouseDetail = (props: any) => {
    const initalState: CharactersState = {
        loading: true,
        houseDetail: null,
    }

    const [state, setState] = useState(initalState)

    const id = () => {
        return window.location.pathname.split('/houses/')[1]
    }

    const fetchData = async () => {
        try {
            const houseDetail = await housesService.getHouseDetail(id())
            setState((s) => ({ ...s, houseDetail, loading: false }))
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

    const { houseDetail: house } = state

    return (
        <div className='container-app'>
            <h2>{lang.houses.title_detail}</h2>
            <Button className='btn-back' type='primary' onClick={goBack}>
                {lang.button.back}
            </Button>
            <Descriptions
                title={`${lang.houses.name}: ${house?.name}`}
                bordered
            >
                <Descriptions.Item label={lang.houses.region}>
                    {house?.region}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.coatOfArms}>
                    {house?.coatOfArms}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.diedOut}>
                    {house?.diedOut}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.founder}>
                    {house?.founder}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.founded}>
                    {house?.founded}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.words}>
                    {house?.words}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.currentLord}>
                    <Link
                        to={`/characters/${
                            house?.currentLord.split('/characters/')[1]
                        }`}
                    >
                        <Tag color='purple'>
                            {house?.currentLord.split('/characters/')[1]}
                        </Tag>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.overLord}>
                    <Link
                        to={`/houses/${house?.overlord.split('/houses/')[1]}`}
                    >
                        <Tag color='cyan'>
                            {house?.overlord.split('/houses/')[1]}
                        </Tag>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.heir}>
                    <Link
                        to={`/characters/${
                            house?.heir.split('/characters/')[1]
                        }`}
                    >
                        <Tag color='purple'>
                            {house?.heir.split('/characters/')[1]}
                        </Tag>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.swornMembers}>
                    {house?.swornMembers.map((val: string, i: number) => (
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
                <Descriptions.Item label={lang.houses.ancestralWeapons}>
                    {house?.ancestralWeapons.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.cadetBranches}>
                    {house?.cadetBranches.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.seats}>
                    {house?.seats.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label={lang.houses.titles} span={2}>
                    {house?.titles.map((val: string, i: number) => (
                        <p key={i}>{val}</p>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default HouseDetail
