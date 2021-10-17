import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Select, Grid, Container, Segment, Input, Dropdown, Icon, Divider } from "semantic-ui-react";
import { restaurantIdOptions, transactionTimeOptions, measureOptions as compareTypeOptions, metricOptions, measureOptions, operatorTypeOptions } from './Data/RestaurantData';
import React, { useState } from "react";

const initialFormData = {
    restaurantIds: [],
    fromDate: "",
    toDate: "",
    fromHour: 6,
    toHour: 29,
    metricCriteria: [{
        metricCode: undefined,
        compareType: undefined,
        value: undefined,
        operatorType: "And"
    }]
};


function App() {
    const [restaurantIds, setRestaurantIds] = useState([]);
    const [fromHour, setFromHour] = useState(6);
    const [toHour, setToHour] = useState(29);

    function onSubmit() {
        console.log("Submit!");
    }

    return (
        <div className="App">
            <Grid>
                <Grid.Row>
                    <Container>
                        <Segment className="Segment">
                            <Grid centered>
                                <Grid.Row columns="1">
                                    <Grid.Column textAlign="center">
                                        <h3>Custom Search Query Tool</h3>
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
                                                    multiple
                                                    selection
                                                    onChange={(event, data) => setRestaurantIds(data.value)}
                                                    value={restaurantIds}
                                                />
                                            </Form.Field>
                                            <Form.Group>
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
                                                    multiple
                                                />


                                                <Form.Field
                                                    control={Select}
                                                    label='Measure Options'
                                                    options={measureOptions}
                                                    placeholder='Measure Options'
                                                    selection
                                                    size='mini'

                                                />
                                                <Form.Input
                                                    fluid label='Value'
                                                    placeholder='Value' />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Field>
                                                    {/* <Button onClick={() => addCriteria()} color="violet">Add Criteria</Button> */}
                                                </Form.Field>

                                            </Form.Group>
                                            <Form.Field>
                                                <Button
                                                    color="olive"
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
                                                    color="red"
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
                    <Container>
                        <Segment>
                            <h3>Results</h3>
                        </Segment>
                    </Container>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default App;
