import { React, useState, useEffect } from 'react'
import CountCard from './CountCard'
import LineChart from './LineChart'
import userApi from "../api/userApi";
import DoughnutChart from './DoughnutChart';
import RadarChart from './RadarChart';

const Dashboard = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataMovies, setDataMovies] = useState([]);
    const [dataAvg, setDataAvg] = useState([]);
    var username = [];
    var rating = [];
    var title = [];
    var movieRating = [];
    var titleAvg = [];
    var avg = [];
    useEffect(() => {
        const fetchUserChart = async () => {
            try {
                const response = await userApi.userChar();
                setDataUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchMovieChart = async () => {
            try {
                const response = await userApi.movieChar();
                setDataMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchMovieAvg = async () => {
            try {
                const response = await userApi.movieCharAvg();
                setDataAvg(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserChart();
        fetchMovieChart();
        fetchMovieAvg();
    }, []);

    dataUsers.forEach((item, index) => {
        username.push(item.username);
        rating.push(item.count)
    })

    dataMovies.forEach((item, index) => {
        title.push(item.title);
        movieRating.push(item.count);
    });

    dataAvg.forEach((item, index) => {
        titleAvg.push(item.title);
        avg.push(item.avg);
    });

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>
            <CountCard />
            <div className="row">
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <LineChart username={titleAvg} rating={avg} label="Average rating of the movie" />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <p className="card-title">The number of reviews of the movie</p>
                            <LineChart username={title} rating={movieRating} option={true} label="Reviews" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <DoughnutChart username={title} rating={movieRating} label="fd" />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <RadarChart username={username} rating={rating} label="The number of reviews of users" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
