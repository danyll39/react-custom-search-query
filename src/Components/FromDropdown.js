import 'semantic-ui-css/semantic.min.css'
import { Form, Select } from 'semantic-ui-react'
import numbers from '../Data/NumbersData'

const FromDropdown = () => {
    return (
        <Form>
            <Form.Field
                control={Select}
                label='From'
                options={numbers}
                placeholder='From'

            />
        </Form>
    )
}

export default FromDropdown
