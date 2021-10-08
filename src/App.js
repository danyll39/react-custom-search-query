import React, { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {  Header, Container } from 'semantic-ui-react'
import RestaurantDropDown from './Components/RestaurantDropdown'
import FromDropdown from './Components/FromDropdown';
import ToDropdown from './Components/ToDropDown';
import MetricsDropdown from './Components/MetricsDropdown';
import SubmitButton from './Components/SubmitButton';



function App() {
  const [date, setDate] = useState(null);
  const handleDateChange = (event, data) => setDate(data.value);

  return (
    <div>
      <Header size='huge'>Custom Query Search</Header>
      <Container>
        <p>
          (Add directions to use Custom Search Query)Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Container>
      <Container>
        <SemanticDatepicker  onChange={handleDateChange} />
        <pre>
          Selected date:
          <br />
          {date ? date.toString() : 'No Date Selected'}
        </pre>

        <RestaurantDropDown />
        <ToDropdown />
        <FromDropdown />
        <MetricsDropdown />
        <SubmitButton />


        {/* <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='food'
                // options={languageOptions}
                search
                text='Select Restaurant ID'
            />
               <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='time'
                // options={languageOptions}
                search
                text='To'
            />
               <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='time'
                // options={languageOptions}
                search
                text='From'
            />
            <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='arrows alternate'
                // options={languageOptions}
                search
                text='Metrics'
            /> */}
      </Container>
      {/* <TimePicker
        onChange={onChange}
        value={value}
      />
       <Clock value={value} /> */}



    </div>
  );
}

export default App;
