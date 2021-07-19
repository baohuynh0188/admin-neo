import React from 'react'

const Publish = (props) => {
    if (props.publish === 1) {
        return (
            <span className="badge rounded-pill bg-success me-1">
                Public
            </span>
        )
    } else if (props.publish === 2) {
        return (
            <span className="badge rounded-pill bg-warning me-1">
                Private
            </span>
        )
    } else {
        return (
            <span className="badge rounded-pill bg-danger me-1">
                Draft
            </span>
        )
    }

}

export default Publish
