import React, { useEffect, useState } from 'react'

// the useEfect hook lets us do something when
// something else happens

function Testing() {
    const [count, setCount] = useState(1)
    useEffect(() => {
        console.log('This is our use effect')
    }, [])

    // Run the code inside this function, 
    // whenever the value of count changes
    useEffect(() => {
        console.log(`The Current count is: ${count}`)
    }, [count])

    function IncreaseCount() {
        setCount(current => current + 1)
    }

    function DecreaseCount() {
        setCount(current => current - 1)
    }

    return (
        <>
            <h1>The Current count is: {count}</h1>
            <br/>
            <button onClick={IncreaseCount}>Increase</button>
            <br/>
            <button onClick={DecreaseCount}>Decrease</button>
        </>
  )
}

export default Testing