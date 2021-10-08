import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Select } from 'semantic-ui-react'
import numbers from '../Data/NumbersData'




const ToDropdown = () => {
    return (
        <Form>
            <Form.Field
                control={Select}
                label='To'
                options={numbers}
                placeholder='To'
                type='number'
            />
        </Form>
    )
}

export default ToDropdown
