// @flow
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FormInput } from '../../../components/';
import moment from 'moment';
// components

const DefaultForm = () => {
    const d = moment().format('YYYY-MM-DD')
    const [selectedDate, setSelectedDate] = useState(d);

    console.log(selectedDate);

    return (
        <Card>
            <Card.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lclForm">Dari</Form.Label>
                        <Form.Control type="text" name="start" id="lclForm" placeholder="Masukan detail alamat keberangkatan" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lclTo">Ke</Form.Label>
                        <Form.Control type="text" name="to" id="lclTo" placeholder="Masukan detail alamat tujuan" />
                    </Form.Group>

                    <FormInput
                        label="Date"
                        type="date"
                        name="date"
                        containerClass={'mb-3'}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const InstantBookingDashboard = (): React$Element<React$FragmentType> => {
    return (
        <>
            <div className='font-22 my-2'>Instant Booking</div>
            <Row>
                <Col>
                    <DefaultForm />
                </Col>
            </Row>
        </>
    );
};
export default InstantBookingDashboard;
