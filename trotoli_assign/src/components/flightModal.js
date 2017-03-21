import React from 'react';
import Select2 from 'react-select2-wrapper';
import { Modal, Popover, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
export default class flightHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { showModal: props.showModal, selectedDay: props.daySelected };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.changeDay = this.changeDay.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.getImage = this.getImage.bind(this);
    }
    changeDay(event) {
        console.log("this", event.target);
        let day = event.target.id;
        this.setState({ selectedDay: day });
    }
getImage(value){
    if(value=='CZ' || value=='IX'){
        return value+'.jpg';
    }
    return value+'.gif';
}
    refreshData(event) {
        console.log("dataset", event.target.dataset.flightindex);
        this.props.refreshData(event.target.dataset.flightindex);
        this.close();
    }
    close() {
        this.setState({ showModal: false });
        this.props.changeModalState(false);
        this.props.setDayByModal(this.state.selectedDay);
    }

    open() {
        this.setState({ showModal: true });

    }


    render() {

        self = this;
        let flightsArray = self.props.data[self.state.selectedDay]["Response"]["Results"][0];
        let offeredFare = 0;
        let refundable = "";
        let noOfStops =0;
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
                                    <div className="row no-gutter filter-bar-wrap">
                                        <div className="row filter-bar">
                                            <div className="col-md-12 col-sm-12 col-xs-12 pd-0">
                                                <label className="filter-by">Filter By </label>
                                                <Select2
                                                    data={['Direct', '1-Stop', '2-Stop', '3-Stop']}
                                                    options={
                                                        {
                                                            placeholder: 'STOPS',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    data={[1, 2, 3, 4]}
                                                    options={
                                                        {
                                                            placeholder: 'DEPART TIME',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    data={['Refundable', 'NonRefundable']}
                                                    options={
                                                        {
                                                            placeholder: 'FARE TYPE',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    data={['AIR INDIA', 'INDIGO']}
                                                    options={
                                                        {
                                                            placeholder: 'AIRLINES',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    data={['Lower To Higher', 'Higher To Lower']}
                                                    options={
                                                        {
                                                            placeholder: 'PRICE',
                                                        }
                                                    }
                                                />
                                               
                                            </div>
                                        </div>
                                    </div>
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

                                        flightsArray.map((flight, flightIndex) => {
                                            offeredFare = flight["Price"]["OfferedFare"];
                                            refundable = flight['isRefundable'] ? 'Refundable' : 'NonRefundable';
                                            noOfStops = flight["Segments"][0].length;
                                            let data = flight["Segments"][0].map((segment, index) => {
                                                return (<div data-flightindex={flightIndex} className="row no-gutter text-center flight-row" onClick={self.refreshData}>
                                                    <img data-flightindex={flightIndex} className="connector" src="src/assets/images/flight-conector.png" />
                                                    <div data-flightindex={flightIndex} className="col-md-2 col-sm-2 col-xs-2 flight-logo">
                                                        <img data-flightindex={flightIndex} src={"src/assets/images/"+ self.getImage(segment['Airline']['AirlineCode'])} />
                                                        <p data-flightindex={flightIndex} >{segment['Airline']['AirlineCode']}</p>
                                                    </div>
                                                    <div data-flightindex={flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4 data-flightindex={flightIndex} >{segment['Origin']['Airport']['CityCode']}</h4>
                                                        <h4 data-flightindex={flightIndex} >{segment['Origin']['DepTime'].split("T")[1]}</h4>
                                                        <p data-flightindex={flightIndex} >{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div data-flightindex={flightIndex} className="col-md-4 col-sm-4 col-xs-4">
                                                        <h4 data-flightindex={flightIndex} >{segment['Duration']}</h4>
                                                        <p data-flightindex={flightIndex}>{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div data-flightindex={flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4 data-flightindex={flightIndex}>{segment['Destination']['Airport']['CityCode']}</h4>
                                                        <h4 data-flightindex={flightIndex}>{segment['Destination']['ArrTime'].split("T")[1]}</h4>
                                                        <p data-flightindex={flightIndex} >{segment['Destination']['ArrTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div data-flightindex={flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                        <button data-flightindex={flightIndex} className="btn form-control price-btn">{offeredFare}</button>
                                                        <p data-flightindex={flightIndex}>{refundable}</p>
                                                    </div>
                                                   {(noOfStops-1===index) ? <hr id="flight-border"/> : null }
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
                        <Button className="btn btn-primary btn-md" onClick={self.close}>DONE</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


