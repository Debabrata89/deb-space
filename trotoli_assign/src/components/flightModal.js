import React from 'react';
import { Modal, Popover, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
export default class flightHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { showModal: props.showModal, selectedDay: props.daySelected };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.changeDay = this.changeDay.bind(this);
    }
    changeDay(event) {
        console.log("this", event.target);
        let day = event.target.id;
        this.setState({ selectedDay: day });
    }


    close() {
        this.setState({ showModal: false });
        this.props.changeModalState(false);
    }

    open() {
        this.setState({ showModal: true });

    }


    render() {

        self = this;
        let flightsArray = self.props.data[self.state.selectedDay]["Response"]["Results"][0];
        let offeredFare=0;
        let refundable="";
        console.log("inside flight model", flightsArray, this.props.days);

        return (
            <div>
                <Modal show={self.state.showModal} onHide={this.close} dialogClassName={self.props.dialogClassName}>
                    <Modal.Header closeButton>
                        <div className="box">
                            <div className="box-head">
                                <ul className="nav nav-pills nav-justified" role="tablist">
                                    {this.props.days.map((day, index) => {
                                        return (<li key={index} role="presentation" className={self.state.selectedDay === day ? "active" : ""} onClick={this.changeDay} >
                                            <a id={day} aria-controls={day} role="tab" data-toggle="tab">{"Day " + day}</a>
                                        </li>);
                                    })
                                    }

                                </ul>
                            </div>
                        </div>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="box-body">
                            <div className="row no-gutter tab-content">
                                <div role="tabpanel" className="tab-pane active" id="fm-1">
                                    <div className="row no-gutter text-center flight-table">
                                        <div className="col-md-2 col-sm-2 col-xs-2">
                                            Sort by:
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2">
                                            Depart
                                        </div>
                                        <div className="col-md-4 col-sm-2 col-xs-2">
                                            Duration
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2">
                                            Arrive
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2">
                                            Price
                                        </div>
                                    </div>
                                    {
                                        
                                        flightsArray.map((flight, index) => {
                                            offeredFare=flight["Price"]["OfferedFare"];
                                            refundable = flight['isRefundable']?'Refundable':'NonRefundable';
                                            let data = flight["Segments"][0].map((segment, index) => {
                                                return (<div className="row no-gutter text-center flight-row">
                                                    <img className="connector" src="src/assets/images/flight-conector.png" />
                                                    <div className="col-md-2 col-sm-2 col-xs-2 flight-logo">
                                                        <img src="src/assets/images/flight-logo.png" />
                                                        <p>{segment['Origin']['Airport']['AirportCode']}</p>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4>{segment['Origin']['Airport']['CityCode']}</h4>
                                                        <h4>{segment['Origin']['DepTime'].split("T")[1]}</h4>
                                                        <p>{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                        <h4>{segment['Duration']}</h4>
                                                        <p>{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4>{segment['Destination']['Airport']['CityCode']}</h4>
                                                        <h4>{segment['Destination']['ArrTime'].split("T")[1]}</h4>
                                                        <p>{segment['Destination']['ArrTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2 col-xs-2">
                                                        <button className="btn form-control price-btn">{offeredFare}</button>
                                                        <p>{refundable}</p>
                                                    </div>
                                                </div>);
                                            })
                                            return data;
                                        })

                                    }

                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={self.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


