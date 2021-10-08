import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Select} from 'semantic-ui-react'
import metrics from '../Data/MetricData'



const MetricsDropdown = () => {


    return (

        <Form>
            <Form.Field
                control={Select}
                label='Metrics'
                options={metrics}
                placeholder='Metrics'
            />
        </Form>



    )
}

export default MetricsDropdown
