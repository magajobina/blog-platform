/* eslint-disable react/prop-types */
import { Alert } from 'antd'
import './ErrorAlert.scss'

export default function ErrorAlert({ description = 'Произошла ошибка' }) {
  return <Alert message="Ошибка" description={description} type="error" showIcon />
}
