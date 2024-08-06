/* eslint-disable react/jsx-props-no-spreading */
import { Spin } from 'antd'
import './Spinner.scss'

export default function Spinner(props) {
  return (
    <div className="text-align-center">
      <Spin size="large" {...props} />
    </div>
  )
}
