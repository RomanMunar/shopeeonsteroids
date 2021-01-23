import { useEffect, useState } from "react"

const Main = () => {
  const [items, setItems] = useState()

  useEffect(() => {
    const fetchItems = async () =>
      await fetch("/api/items")
        .then((r) => r.json())
        .then((data) => setItems(data))

    fetchItems()
  }, [])

  return (
    <div>
      <span>HEYLLOO</span>
      <pre>Hey{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}

export default Main
