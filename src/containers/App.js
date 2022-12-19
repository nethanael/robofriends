import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) })
    }, []);

    const onSearchEvent = (event) => {
        setSearchField(event.target.value);
    };

    const filteredRobots = robots.filter(robot =>                       //attention to .filter .includes
        robot.name.toLowerCase().includes(searchfield.toLowerCase()));

    console.log(robots, searchfield);

    return !robots.length ? <h1>Loading</h1> :                          //ternary
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={() => setCount(count + 1)}>Click Me!</button>
                <SearchBox searchChange={onSearchEvent} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
};

export default App;