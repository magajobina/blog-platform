import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function Test() {
  const { slug } = useParams()

  return <h1>TEST {slug}</h1>
}