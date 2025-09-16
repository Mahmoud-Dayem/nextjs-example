import React from 'react'

function Details({ params }) {
    const { details } = params
    return (
        <div>
            <h1>
                {details}
            </h1>
        </div>
    )
}

export default Details