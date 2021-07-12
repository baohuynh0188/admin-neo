import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import movieApi from '../api/movieApi';

const CountCard = () => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await movieApi.count();
                setCount(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCount();
    }, []);

    return (
        <div className="row">
            {count.map((item, index) => (
                <div className="col-xl-3 col-md-6" key={index}>
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">{item.info.label} - <span>{item.info.count}</span></div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link to={item.info.url} className="small text-white stretched-link">View Details</Link>
                            <div className="small text-white"><i className="fa fa-cog fa-spin fa-2x fa-fw"></i></div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default CountCard
