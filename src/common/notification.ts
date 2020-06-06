import { notification } from 'antd'
import lang from '../i18n/lang.json'

export const showNotification = () => {
    notification.open({
        message: lang.notification.title,
        description: lang.notification.error,
    })
}
