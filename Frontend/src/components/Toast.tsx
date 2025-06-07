import React from 'react'

function Toast({ type, message }: { type: string, message: string }) {
    return (
        <div className="toast toast-top toast-end w-50 text-3xl">
            <div className={`alert alert-${type} shadow-lg`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Toast