import React from 'react'

function Account({ params }) {
    const { id } = params
    return (
        <div>
            <h1>Account ID: {id}</h1>
            <p>This is a dynamic route using App Router.</p>
        </div>
    )
}

export default Account