import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
    state = { 
        robots: [],
        searchfield: '' 
    } 

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users=> {this.setState({ robots: users })
        }); 
    }

    onSearchEvent = (event) => {
        this.setState({ searchfield:event.target.value })
    }

    render() {

        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot =>                       //attention to .filter .includes
            robot.name.toLowerCase().includes(searchfield.toLowerCase())
        );

        return !robots.length ? <h1>Loading</h1> :                          //ternary
            (        
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchEvent} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
}
 
export default App;