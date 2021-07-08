import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
import './App.css';

class App extends Component
{
    constructor()
    {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    onSearchChange = (event) =>
    {
        this.setState({searchField: event.target.value})
  
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/users').then(response=> {
            return response.json();  
        }).then(users => {
            this.setState({robots:users})
        })  
    }


    render()
    {  
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot=>{return robot.name.toLowerCase().includes(searchField.toLowerCase());})
      
        return !robots.length ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}></SearchBox>
                <Scroll>
                    <ErrorBoundry>
                     <CardList robots={filteredRobots}></CardList>
                     </ErrorBoundry>
                </Scroll>
            </div>
            );
        
    }

}

export default App;