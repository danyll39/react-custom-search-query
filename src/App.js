import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Button, Form, Select, Grid, Header, Container, Segment, Input, Dropdown, Icon, Divider, Label, Menu, Pagination, Table } from "semantic-ui-react";
import { restaurantIdOptions, transactionTimeOptions, measureOptions as compareTypeOptions, metricOptions, measureOptions, operatorTypeOptions } from './Data/RestaurantData';
import dateFormat, { masks } from "dateformat";
import React, { useState, useEffect } from "react";

const now = new Date();
const initialFormData = {
    restaurantIds: [],
    fromDate: "",
    toDate: "",
    fromHour: 6,
    toHour: 29,
    metricCriteria: [{
        metricCode: "",
        compareType: "",
        value: "",
        operatorType: "And"
    }]
};


function App() {
    const [restaurantIds, setRestaurantIds] = useState([]);
    const [metricCode, setMetricCode] = useState('')
    const [compareTypeOptions, setCompareTypeOptions] = useState('')
    const [value, setValue] = useState('')
    const [operatorTypeOptions, setOperatorTypeOptions] = useState('And')


    const [fromHour, setFromHour] = useState(6);
    const [toHour, setToHour] = useState(29);
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [focusedInput, setFocusedInput] = React.useState();



    const [metrics, setMetrics] = useState([])
    const [formData, setFormData] = useState([])

    const [resultData, setResultData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage, setPostsPerPage] = useState(20)
   





    // function changeValue(data, index) {
    //     const newFormData = { ...formData }
    //     newFormData.metricCriteria[index]['value'] = Number(data.value)
    //     setFormData(newFormData)
    // }


    //leave empty to get information when page load


    function onSubmit() {
        const formData = {
            restaurantIds: restaurantIds,
            fromDate: startDate,
            toDate: endDate,
            fromHour: fromHour,
            toHour: toHour,
            metricCriteria: [{
                metricCode: metricCode,
                compareType: compareTypeOptions,
                value: Number(value),
                operatorType: operatorTypeOptions

            }]


        }
        console.log(formData)
        const userAction = async () => {
            try {
                const response = await fetch('https://customsearchqueryapi.azurewebsites.net/Search/Query', {
                    method: 'POST',
                    body: JSON.stringify(formData), // string or object
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const promise = await response.json(); //extract JSON from the http response
                // do something with myJson
                // console.log('hello')
                // console.log(resultData)
                // setResultData(resultData)
                return promise;
            } catch (error) {
                console.log("error", error);
            }
        }
        userAction().then(data => {
            console.log(data)
            // console.log(resultData)
            setResultData(data)
        });

    }


    useEffect(() => {
        const url = "https://customsearchqueryapi.azurewebsites.net/Search/MetricDefinitions";

        const fetchData = async () => {
          
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log("hello i see you")
                console.log(data)
                setMetrics(data);
            

            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [])



    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = resultData.slice(indexOfFirstPost, indexOfLastPost)

const addCriteria = () => {
    
  

}

    // console.log(data[1])
    return (
        <div className="App">
            <Grid className='Grid'>
                <Grid.Row>
                    <Container className='Container'>
                        <Segment className="Segment">
                            <Grid centered>
                                <Grid.Row columns="1">
                                    <Grid.Column textAlign="center">
                                        <Header
                                            as='h1'
                                            block
                                            color='teal'>Custom Search Query Tool
                                        </Header>

                                        <Segment raised>
                                            HOW IT WORKS:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo sed egestas egestas. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Vestibulum sed arcu non odio euismod. Vitae nunc sed velit dignissim sodales. Nunc sed augue lacus viverra vitae. Amet tellus cras adipiscing enim eu turpis egestas pretium. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Enim sit amet venenatis urna cursus. Sem integer vitae justo eget. Posuere ac ut consequat semper viverra. Ut enim blandit volutpat maecenas volutpat blandit. Platea dictumst vestibulum rhoncus est pellentesque. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Magna eget est lorem ipsum dolor. Lectus nulla at volutpat diam ut venenatis tellus in.
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns="1">
                                    <Grid.Column>
                                        <Form onSubmit={() => onSubmit()}>
                                            {/* <Form onSubmit={}> */}
                                            <Form.Field>
                                                <label style={{ fontWeight: "bold" }}>Restaurant Id</label>
                                                <Dropdown
                                                    options={restaurantIdOptions}
                                                    placeholder={"Select Restaurant Id"}
                                                    multiple={true}
                                                    selection
                                                    onChange={(event, data) => setRestaurantIds(data.value)}
                                                    value={restaurantIds}
                                                />
                                            </Form.Field>
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <label style={{ fontWeight: "bold" }}>Date</label>
                                                    <DateRangePicker
                                                        startDate={startDate}
                                                        startDateId="start-date"
                                                        endDate={endDate}
                                                        endDateId="end-date"
                                                        onDatesChange={({ startDate, endDate }) => {
                                                            setStartDate(startDate);
                                                            setEndDate(endDate);
                                                        }}
                                                        isOutsideRange={() => false}
                                                        focusedInput={focusedInput}
                                                        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                                                    />
                                                </Form.Field>

                                                <Form.Field

                                                    control={Select}
                                                    label={"Transaction Time Start"}
                                                    options={transactionTimeOptions}
                                                    value={fromHour}
                                                    onChange={(event, data) => setFromHour(data.value)}
                                                />
                                                <Form.Field
                                                    control={Select}
                                                    label={"Transaction Time End"}
                                                    options={transactionTimeOptions}
                                                    value={toHour}
                                                    onChange={(event, data) => setToHour(data.value)}
                                                />
                                            </Form.Group>.
                                            <Form.Group widths='equal'>
                                                <Form.Field
                                                    control={Select}
                                                    label='Metrics'
                                                    options={metricOptions}
                                                    placeholder='Metrics'
                                                    selection
                                                    // value={metricOptions}
                                                    onChange={(event, data) => setMetricCode(data.value)}
                                                />


                                                <Form.Field
                                                    control={Select}
                                                    label='Measure Options'
                                                    options={measureOptions}
                                                    placeholder='Measure Options'
                                                    selection
                                                    size='mini'
                                                    // value={measureOptions}
                                                    onChange={(event, data) => setCompareTypeOptions(data.value)}

                                                />
                                                <Form.Input
                                                    fluid label='Value'
                                                    placeholder='Value'
                                                    onChange={(event, data) => setValue(data.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Field>
                                                    {/* <Button onClick={() => addCriteria()} color="violet">Add Criteria</Button> */}
                                                </Form.Field>

                                            </Form.Group>
                                            <Form.Field>
                                                <Button
                                                   
                                                    color="teal"
                                                    type="submit">
                                                    Add Criteria
                                                </Button>
                                            </Form.Field>
                                            <Form.Group>
                                                <Form.Field>
                                                    {/* <Button onClick={() => addCriteria()} color="violet">Add Criteria</Button> */}
                                                </Form.Field>

                                            </Form.Group>
                                            <Form.Field>
                                                <Button
                                                    className="submitButton"
                                                    color="grey"
                                                    type="submit">
                                                    Submit
                                                </Button>
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Row>
                <Divider hidden></Divider>
                <Grid.Row>
                    <Container fluid>
                        <Segment>
                            <Table celled compact='very'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Restaurant ID</Table.HeaderCell>
                                        <Table.HeaderCell>Transaction Date</Table.HeaderCell>
                                        <Table.HeaderCell>Order Number</Table.HeaderCell>
                                        <Table.HeaderCell>Order Time</Table.HeaderCell>
                                        {metrics.map((m, index) => { return <Table.HeaderCell key={index}>{m.metricCode}</Table.HeaderCell> })}


                                    </Table.Row>
                                </Table.Header>
                                {resultData &&
                                    <Table.Body>
                                        {resultData.map((data, index) => {
                                            // console.log(resultData)
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>
                                                        {data["restaurantId"]}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {dateFormat(now, data["busDt"])}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {data["orderNumber"]}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {data["orderTime"]}
                                                    </Table.Cell>

                                                    {
                                                        metrics.map((m, index2) => {

                                                            const fieldName = m.metricCode[0].toLowerCase() +
                                                                m.metricCode.substring(1);
                                                            return (
                                                                <Table.Cell key={index2}>
                                                                    {data[fieldName]}
                                                                </Table.Cell>
                                                            )
                                                        })
                                                    }
                                                </Table.Row>
                                            )
                                        })}


                                        {/* {resultData.map(result => { return <Table.Cell>{result}</Table.Cell> })} */}

                                    </Table.Body>

                                }
                                <Pagination

                                    boundaryRange={0}
                                    defaultActivePage={5}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={1}
                                    totalPages={10}
                                />
                            </Table>

                        </Segment>
                    </Container>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default App;
