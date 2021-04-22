import React, { useState, useEffect } from 'react'

const FetchData = initUrl => {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  useEffect(() => {
    let ignore = false
    const fetchMdData = async () => {
      setLoading(true)
      try {
        setError({})
        const result = await fetch(initUrl).then(response => response.text())
        if (!ignore) setData(result)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchMdData()
    return () => {
      ignore = true
    }
  }, [initUrl])

  return { data, loading, error }
}

export default FetchData
