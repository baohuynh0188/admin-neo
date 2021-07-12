import Dashboard from "./components/Dashboard";
import Genre from "./components/Genre"
import User from "./components/User"
import Movie from "./components/Movie"
import GenreAdd from "./components/GenreAdd"
import MovieAdd from "./components/MovieAdd";
import MovieEdit from "./components/MovieEdit";
import MovieDetail from "./components/MovieDetail";

const routes = [
    {
        path: "/",
        component: () => <Dashboard />,
        exact: true,
    },
    {
        path: "/genres",
        component: () => <Genre />,
        exact: true,
    },
    {
        path: "/genres/add",
        component: () => <GenreAdd />,
        exact: false,
    },
    {
        path: "/users",
        component: () => <User />,
        exact: false,
    },
    {
        path: "/movies",
        component: () => <Movie />,
        exact: true,
    },
    {
        path: "/movies/add",
        component: () => <MovieAdd />,
        exact: false,
    },
    {
        path: "/movies/detail/:id",
        component: () => <MovieDetail />,
        exact: false,
    },
    {
        path: "/movies/edit/:id",
        component: () => <MovieEdit />,
        exact: false,
    },
];

export default routes;
