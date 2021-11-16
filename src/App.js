import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Button, Form, Select, Grid, Header, Container, Segment, Input, Dropdown, Icon, Divider, Pagination, Table } from "semantic-ui-react";
import { restaurantIdOptions, transactionTimeOptions, measureOptions as compareTypeOptions, metricOptions, measureOptions, operatorTypeOptions, formatValues, operatorType } from './Data/RestaurantData';
import React, { useState, useEffect } from "react";



const initialMetricCriteria = [{
    metricCode: "",
    compareType: "",
    value: "",
    operatorType: "And"
}]

function App() {
    const [restaurantIds, setRestaurantIds] = useState([]);

    const [metricCriteria, setMetricCriteria] = useState(initialMetricCriteria)

    const [fromHour, setFromHour] = useState(6);
    const [toHour, setToHour] = useState(29);
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [focusedInput, setFocusedInput] = React.useState();
    const [activePage, setActivePage] = useState(1);
    const [metrics, setMetrics] = useState([]);
    const [resultData, setResultData] = useState([]);


    const itemsPerPage = 10

    function onSubmit() {
        const formData = {
            restaurantIds: restaurantIds,
            fromDate: startDate,
            toDate: endDate,
            fromHour: fromHour,
            toHour: toHour,
            metricCriteria: metricCriteria
        }
    
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

                return promise;
            } catch (error) {
                console.log("error", error);
            }
        }
        userAction().then(data => {
            setResultData(data)
        });

    }


    useEffect(() => {
        const url = "https://customsearchqueryapi.azurewebsites.net/Search/MetricDefinitions";

        const fetchData = async () => {

            try {
                const response = await fetch(url);
                const data = await response.json();
                setMetrics(data);


            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [])

    function changeMetricCriteria(index, propertyName, data) {
        const metricCriteriaNew = []
        for (var i = 0; i < metricCriteria.length; i++) {
            metricCriteriaNew[i] = metricCriteria[i]
        }
        if (propertyName === "value") {
            metricCriteriaNew[index][propertyName] = Number(data.value)

        } else {
            metricCriteriaNew[index][propertyName] = data.value

        }
        setMetricCriteria(metricCriteriaNew)
    }

    function addCriteria() {
        const metricCriteriaNew = []
        for (var i = 0; i < metricCriteria.length; i++) {
            metricCriteriaNew[i] = metricCriteria[i]
        }
        metricCriteriaNew.push(
            {
                metricCode: "",
                compareType: "",
                value: "",
                operatorType: "And"
            }
        )
        setMetricCriteria(metricCriteriaNew)
    }

    function removeCriteria(index) {
        const metricCriteriaNew = []
        for (var i = 0; i < metricCriteria.length; i++) {
            metricCriteriaNew[i] = metricCriteria[i]
        }

        metricCriteriaNew.splice(index, 1)
        setMetricCriteria(metricCriteriaNew)
    }

    function changePage(data) {
        setActivePage(data.activePage)
    }
    const slicedResultsData = resultData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

    return (
        <div className="App" >
            <Grid >
                <Grid.Row>
                    <Container className='Container'>
                        <Segment className="Segment">
                            <Grid centered>
                                <Grid.Row columns="1">
                                    <Grid.Column textAlign="center">
                                        <Header
                                            as='h1'
                                            block
                                            color='teal'
                                          >Custom Search Query Tool
                                        </Header>

                                        <Segment raised>
                                            HOW IT WORKS:  Select Restaurant Id (multiple), Date, Transactions Start Time, Transaction End Time, Metrics, Measure Options, and Value to return restaurant data. Click Add Criteria to add additional metrics, measure options, and operator type. Operator type "And" will return data that meets both Metric Criterias entered and Operator "Or" will return data of both Metrics Criterias entered.
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns="1">
                                    <Grid.Column>
                                        <Form onSubmit={() => onSubmit()}>
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
                                            </Form.Group >
                                            {metricCriteria.map((criteria, index) => {
                                                return (
                                                    <Form.Group key={index} widths='equal'>
                                                        {metricCriteria.length > 1 &&
                                                            <Form.Field width={1}>
                                                                <div >
                                                                    <Icon name='trash' onClick={() => removeCriteria(index)} />
                                                                </div>
                                                            </Form.Field>
                                                        }

                                                        <Form.Field
                                                            control={Select}
                                                            label='Metrics'
                                                            options={metricOptions}
                                                            placeholder='Metrics'
                                                            selection
                                                            value={metricCriteria[index].metricCode}


                                                            onChange={(event, data) => changeMetricCriteria(index, 'metricCode', data)}
                                                        />
                                                        <Form.Field
                                                            control={Select}
                                                            label='Measure Options'
                                                            options={measureOptions}
                                                            placeholder='Measure Options'
                                                            selection
                                                            size='mini'
                                                            value={metricCriteria[index].compareType}
                                                            onChange={(event, data) => changeMetricCriteria(index, 'compareType', data)}
                                                        />
                                                        <Form.Field
                                                            control={Input}
                                                            label='Value'
                                                            placeholder='Value'
                                                            value={metricCriteria[index].value}
                                                            onChange={(event, data) => changeMetricCriteria(index, 'value', data)}
                                                        />
                                                        <Form.Field
                                                            control={Select}
                                                            label={'Operator Type'}
                                                            options={operatorTypeOptions}
                                                            placeholder={'Value'}
                                                            value={metricCriteria[index].operatorType}
                                                            onChange={(event, data) => changeMetricCriteria(index, 'operatorType', data)}
                                                            disabled={index === 0 ? true : false}
                                                        />
                                                    </Form.Group>
                                                );
                                            })}

                                            <Form.Group>
                                                <Form.Field>
                                                    <Button type="button" onClick={() => addCriteria()} color="teal">Add Criteria</Button>
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Field>
                                                <Button
                                                    className="submitButton"
                                                    color="yellow"
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
                    <Container className="ResultsContainer">
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column className='Results'>
                                        <h2>Results</h2>
                                    </Grid.Column>
                                    <Grid.Column textAlign="right" floated='right'>
                                        {resultData.length >= itemsPerPage &&
                                            <Pagination 
                                                className={'Pager'}
                                                size='small'
                                                activePage={activePage}
                                                onPageChange={(event, data) => changePage(data)}
                                                totalPages={Math.ceil(resultData.length / itemsPerPage)}

                                                ellipsisItem={{
                                                    content: <Icon name='ellipsis horizontal' />,
                                                    icon: true
                                                }}
                                                firstItem={null}
                                                lastItem={null}
                                                prevItem={null}
                                                nextItem={null}
                                            />
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Table celled  className="table">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Restaurant ID</Table.HeaderCell>
                                        <Table.HeaderCell>Transaction Date</Table.HeaderCell>
                                        <Table.HeaderCell>Order Number</Table.HeaderCell>
                                        <Table.HeaderCell>Order Time</Table.HeaderCell>
                                        {metrics.map((m, index) => { return <Table.HeaderCell key={index}>{m.alias}</Table.HeaderCell> })}


                                    </Table.Row>
                                </Table.Header>
                                {resultData &&
                                    <Table.Body>
                                        {slicedResultsData.map((data, index) => {

                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>
                                                        {data["restaurantId"]}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {formatValues(data["busDt"], "Date", 0)}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {data["orderNumber"]}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {formatValues(data["orderTime"], "Time", 0)}
                                                    </Table.Cell>

                                                    {
                                                        metrics.map((m, index2) => {

                                                            const fieldName = m.metricCode[0].toLowerCase() +
                                                                m.metricCode.substring(1);
                                                            return (
                                                                <Table.Cell key={index2}>
                                                                    {formatValues(data[fieldName], m.dataType, m.decimalPlaces)}
                                                                </Table.Cell>
                                                            )
                                                        })
                                                    }
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                }
                            </Table>
                        </Segment>
                    </Container>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default App;