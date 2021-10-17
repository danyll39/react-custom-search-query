import 'semantic-ui-css/semantic.min.css'
import {  Form, Select } from 'semantic-ui-react'

const RestaurantDropdown = () => {
    return (
        <Form>
        <Form.Field
            control={Select}
            label='Restaurant ID'
            options={[]}
            placeholder='Restaurant ID'
            selection
            multiple
        />
    </Form>
    )
}

export default RestaurantDropdown



