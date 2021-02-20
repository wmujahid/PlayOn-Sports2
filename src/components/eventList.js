import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { Table, TableCell, TableRow, TableHead, TableBody, FormLabel, TextField, FormControl, Select } from '@material-ui/core';
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
      <form>
        <FormLabel>State Association</FormLabel> 
          <FormControl component="fieldset">
            <Select
              label="End Date"
              native
              autoWidth='true'
              name="stateAssociationKey"
              onChange={(event) => setAssociationKey(event.target.value)}
            >
              <option aria-label="None" value="" />
              <option value='18bad24aaa'>GHSA</option>
              <option value='542bc38f95'>UIL</option>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="datetime-local"
            onChange={({ target: { value } }) => setStartDate(value && (new Date(value)).toISOString())}
            InputLabelProps={{
              shrink: true,
            }}
          /> 
          <TextField
            label="End Date"
            type="datetime-local"
            onChange={({ target: { value } }) => setEndDate(value && (new Date(value)).toISOString())}
            InputLabelProps={{
              shrink: true,
            }}
          /> 
      </form>

      <Table stickyHeader striped bordered='true' hover>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Headline</TableCell>
            <TableCell>Subheadline</TableCell>
            <TableCell>Start Time</TableCell>
          </TableRow>
        </TableHead>
        {eventData.map(({ key, start_time, publishers: [{ broadcasts: [{ headline, subheadline }] }] }) => {
          console.log(key, start_time);
          return (
            <TableBody key={key}>
              <TableRow hover>
                <TableCell>{key}</TableCell>
                <TableCell>{headline}</TableCell>
                <TableCell>{subheadline}</TableCell>
                <TableCell>{format(start_time)}</TableCell>
              </TableRow>
            </TableBody>
            )
          })}
      </Table>
    </div>
  );
}

export default EventList;