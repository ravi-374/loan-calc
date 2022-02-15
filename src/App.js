import landing from "./loan-calc.png";
import {Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';
import {useEffect, useState} from "react";
import RangeSlider from 'react-bootstrap-range-slider';


function App() {
    const [loanAmount, setLoanAmount] = useState('10000');
    const [loanTerms, setLoanTerms] = useState('2.9');
    const [repaymentTerms, setRepaymentTerms] = useState('weekly');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [Years, setYears] = useState(1);

    useEffect(() => {
        let Years = 10;
        if (loanTerms === '2.9'){
            Years = 1;
        }else if (loanTerms === '3.1'){
            Years = 2;
        }else if (loanTerms === '3.3'){
            Years = 3;
        }else if (loanTerms === '3.6'){
            Years = 4;
        }
        setYears(Years);
    },[loanTerms]);

    useEffect(() => {
        handleCalculate();
    },[loanAmount,loanTerms,repaymentTerms,monthlyPayment,totalPayment,Years]);

    const handleCalculate = () => {
        let principal = parseFloat(loanAmount);
        console.log('principal--',principal);
        let interest = parseFloat(loanTerms) / 100 / 12;
        console.log('interest--',interest)
        let payments = parseFloat(Years) * 12;
        console.log('payments--',payments);

        let x = Math.pow(1 + interest, payments);
        let monthly = (principal*x*interest)/(x-1);
        console.log('monthly--',monthly);
        setTotalPayment((monthly*payments).toFixed(2));
        if (repaymentTerms === "weekly"){
            monthly = monthly/4;
        }else if (repaymentTerms === "fortnightly"){
            monthly = monthly/2;
        }
        setMonthlyPayment(monthly.toFixed(2));
    };

    return (
        <div className="main-contain">
            <div className="sidebar">
                <Card className="mt-4 rounded custom-card">
                    <Card.Header className="bg-white border-0">
                        <h4>Your Interest Calculator</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <div className="d-flex justify-content-between">
                                    <label className="form-label">Loan Amount</label>

                                    <label className="form-label form-loan-amt">{"$"+loanAmount}</label>
                                </div>
                                <RangeSlider
                                    value={loanAmount}
                                    min={1000} max={35000}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                />
                            </Form.Group>
                            <label className="form-label">Loan Terms</label>
                            <Form.Group className="mb-3">
                                <Form.Select className="form-select" value={loanTerms}
                                             onChange={(e) => setLoanTerms(e.target.value)}>
                                    <option value="2.9">1 Years</option>
                                    <option value="3.1">2 Years</option>
                                    <option value="3.3">3 Years</option>
                                    <option value="3.6">4 Years</option>
                                </Form.Select>
                            </Form.Group>
                            <label className="form-label">Repayment Terms</label>
                            <Form.Group className="mb-3">
                                <Form.Select className="form-select" value={repaymentTerms}
                                             onChange={(e) => setRepaymentTerms(e.target.value)}>
                                    <option value="weekly">weekly</option>
                                    <option value="fortnightly">fortnightly</option>
                                    <option value="monthly">monthly</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col>
                                        <div>
                                            <Form.Label className="form-label">{repaymentTerms} Repayments</Form.Label>
                                        </div>
                                        <div>
                                            <Form.Label className="form-label">{"$" + monthlyPayment}</Form.Label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <Form.Label className="form-label">Total Repayments</Form.Label>
                                        </div>
                                        <div>
                                            <Form.Label className="form-label">{"$" + totalPayment}</Form.Label>
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button className="py-3 mt-3 btn-block form-calc-btn" onClick={handleCalculate}>
                                Calculate repayments
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <img width="100%" className="bg-img" src={landing} alt="logo"/>
            </div>
        </div>
    );
}

export default App;
