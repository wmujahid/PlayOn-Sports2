import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { Form, Col, Table } from 'react-bootstrap';
import moment from 'moment';

function format(dateString) {
  return moment(dateString).format('LLL');
}

function EventList() {
  const [associationKey, setAssociationKey] = useState('18bad24aaa');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventData, setEventData] = useState([]);
  
  useEffect(async () => {
    const result = await axios.get(
      `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=${associationKey}&size=50&from=${startDate}&to=${endDate}&start=0`
    )
    setEventData(result.data.items)
  }, [associationKey, startDate, endDate])

  return (
    <div>
      <h1>Play Ball!</h1>
      <div>
        <Form>
          <Form.Row>
            <Col lg={2}>
              <Form.Label>
                State Association
                <Form.Control
                  as="select"
                  name=""
                  onChange={(event) => setAssociationKey(event.target.value)}
                >
                  <option value='18bad24aaa'>GHSA</option>
                  <option value='542bc38f95'>UIL</option>
                </Form.Control>
              </Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Label>
                Start Date: 
                <Form.Control
                  type="datetime-local"
                  name="startDate"
                  onChange={({ target: { value } }) => setStartDate(value && (new Date(value)).toISOString())}
                  placeholder="Start Date"
                />
              </Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Label>
                End Date: 
                <Form.Control
                  type="datetime-local"
                  name="endDate"
                  onChange={({ target: { value } }) => setEndDate(value && (new Date(value)).toISOString())}
                  placeholder="End Date"
                />
              </Form.Label>
            </Col>
          </Form.Row>
        </Form>
      </div>
      <Table striped bordered='true' hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Headline</th>
            <th>Subheadline</th>
            <th>Start Time</th>
          </tr>
        </thead>
        {eventData.map(({ key, start_time, publishers: [{ broadcasts: [{ headline, subheadline }] }] }) => {
          console.log(key, start_time);
          return (
            <tbody key={key}>
              <tr>
                <td>{key}</td>
                <td>{headline}</td>
                <td>{subheadline}</td>
                <td>{format(start_time)}</td>
              </tr>
            </tbody>
            )
          })}
          </Table>
    </div>
  );
}

export default EventList;