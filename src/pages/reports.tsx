import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Select,
  DateInput,
  Card,
  Typography,
  Accordion,
  AccordionItem,
  Table,
  Form,
  Field,
  Button,
  ChartDonut,
} from '@app/components';

type Filters = {
  projectId: string;
  gatewayId: string;
  from: string;
  to: string;
};

const Reports = () => {
  const [activeProject, setActiveProject] = useState('project1');
  const theme = useTheme();

  return (
    <div>
      <Form<Filters> onSubmit={(values) => console.log(values)}>
        <Field name="projectId">
          {(fieldProps) => (
            <Select {...fieldProps}>
              <option value="">All Projects</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
            </Select>
          )}
        </Field>
        <Field name="gatewayId">
          {(fieldProps) => (
            <Select {...fieldProps}>
              <option value="">All Gateways</option>
              <option value="gateway1">Gateway 1</option>
              <option value="gateway2">Gateway 2</option>
            </Select>
          )}
        </Field>
        <Field name="from">
          {(fieldProps) => (
            <DateInput
              {...fieldProps}
              minDate="2021-01-01"
              maxDate="2021-12-31"
            />
          )}
        </Field>
        <Field name="to">
          {(fieldProps) => (
            <DateInput
              {...fieldProps}
              minDate="2021-01-01"
              maxDate="2021-12-31"
            />
          )}
        </Field>

        <Button type="submit">Generate Report</Button>
      </Form>

      <Card>
        <Typography>Hello World</Typography>

        <Accordion activeId={activeProject} onActiveIdChange={setActiveProject}>
          <AccordionItem id="project1" title="Some title 1">
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/21/2021</td>
                  <td>a732b</td>
                  <td>3964 USD</td>
                </tr>
                <tr>
                  <td>01/21/2021</td>
                  <td>a732b</td>
                  <td>3964 USD</td>
                </tr>
                <tr>
                  <td>01/21/2021</td>
                  <td>a732b</td>
                  <td>3964 USD</td>
                </tr>
              </tbody>
            </Table>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            elementum nibh non volutpat blandit. Sed at sodales purus. Morbi
            placerat risus sit amet quam cursus sodales. Cras rhoncus justo et
            est semper, sed viverra purus faucibus. Nulla vel eros hendrerit
            quam egestas porttitor.
          </AccordionItem>
          <AccordionItem id="project2" title="Some title 2">
            Aenean et erat in dui elementum aliquet et vitae velit. Fusce ac
            libero ut nibh condimentum sagittis vitae vel arcu. Quisque faucibus
            egestas sapien. Quisque lacinia egestas odio, eu aliquet lacus
            feugiat et. Fusce et est lectus. Vestibulum sed purus sit amet velit
            auctor bibendum id quis dolor.
          </AccordionItem>
          <AccordionItem id="project3" title="Some title 3">
            Nunc libero turpis, mollis non suscipit ut, tempor ut turpis. Duis
            pellentesque, orci in iaculis facilisis, urna metus malesuada
            tellus, nec suscipit arcu tellus nec tortor. Etiam scelerisque, odio
            nec convallis bibendum, erat sapien lobortis libero, finibus
            molestie mauris sapien sed tortor.
          </AccordionItem>
        </Accordion>
      </Card>

      <ChartDonut
        series={[
          { name: 'Project 1', value: 25, color: theme.palette.blue.main },
          { name: 'Project 2', value: 254, color: theme.palette.yellow.dark },
          { name: 'Project 3', value: 504, color: theme.palette.green.main },
        ]}
      />
    </div>
  );
};

export default Reports;
