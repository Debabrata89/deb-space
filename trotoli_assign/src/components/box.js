import React from 'react';
import FlightModal from './flightModal';
export default class Box extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            daySelected: Object.keys(props.data)[0],
            showModal : false
        };
        this.changeDay = this.changeDay.bind(this);
        this.showflightModal = this.showflightModal.bind(this);
        this.changeModalState = this.changeModalState.bind(this);

    }
     changeModalState(value){
         this.setState({ showModal: value });
    }
    showflightModal(event){
        this.setState({ showModal: true });
    }
    changeDay(event) {
        console.log("this", event.target);
        let day = event.target.id;
        this.setState({ daySelected: day });
    }
    render() {
        console.log("inside box js", this.props.data);
        let self = this;
        let flightData = this.props.data;
        let daysArray =Object.keys(this.props.data).map((value, index) => {
            return (value);
        });
        return (
            <div className="box">
                <div className="box-head">
                    <ul className="nav nav-pills nav-justified" role="tablist">
                        {Object.keys(this.props.data).map((value, index) => {
                            return (
                                <li key={"day" + value} role="presentation" className={self.state.daySelected === value ? "active" : ""} onClick={this.changeDay} >
                                    <a id={value} aria-controls={"flight" + value} role="tab" data-toggle="tab">
                                        {"Day " + value}
                                    </a>
                                </li>);
                        })}
                    </ul>
                </div>
                <div className="box-body">
                    <div className="tab-content">
                        <div className="tab-pane active" id={"flight" + self.state.daySelected}>
                            <div className="hr-line"></div>
                            <div className="row no-gutter">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="flight-block">
                                        <div className="flight-head">
                                            <div className="departure">
                                                <h4>
                                                    Departure
                                                     <div className="time-km">
                                                        <img src="src/assets/images/clock.png" />
                                                        <label>3HRS</label>
                                                        <img src="src/assets/images/calendar.png" />
                                                        <label>11 MAR</label>
                                                    </div>
                                                </h4>
                                            </div>
                                            <div className="title">
                                                <h3>{flightData[self.state.daySelected]["Response"]["Origin"]} TO {" " + flightData[self.state.daySelected]["Response"]["Destination"]}
                                                    <span>{flightData[self.state.daySelected]["Response"]["Results"][0][0]['Price']['OfferedFare']}{flightData[self.state.daySelected]["Response"]["Results"][0][0]['Price']['Currency']}/Person</span></h3>
                                            </div>
                                        </div>
                                        {flightData[self.state.daySelected]["Response"]["Results"][0][0]["Segments"][0].map((segment, index) => {
                                            return (<div key={index} className="flight-body">
                                                <div className="row flights-wrap">
                                                    <div className="col-md-3 col-sm-3 col-xs-12 flight-logo">
                                                        <img src="src/assets/images/flight-logo.png" />
                                                        <div>
                                                            <p>{segment["Airline"]["AirlineName"]} </p>
                                                            <p>{flightData[self.state.daySelected]["Response"]["Results"][0][0]["AirlineCode"]}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-3 col-xs-12">
                                                        <ul>
                                                            <li>{segment["Origin"]["Airport"]["CityCode"]} | {segment["Origin"]["DepTime"].split("T")[1]}</li>
                                                            <li>{segment["Origin"]["Airport"]["CityName"]}, {segment["Origin"]["Airport"]["CountryName"]}</li>
                                                            <li>{segment["Origin"]["DepTime"].split("T")[0]}</li>
                                                            <li className="airport">{segment["Origin"]["Airport"]["AirportName"]},</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-3 col-sm-3 col-xs-12 pd-0">
                                                        <ul>
                                                            <li className="airport">{segment["Airline"]["FareClass"]} | 
                                                                {flightData[self.state.daySelected]["Response"]["Results"][0][0]['isRefundable']?'Refundable':'NonRefundable'} | 
                                                                {flightData[self.state.daySelected]["Response"]["Results"][0][0]['BaggageAllowance'].replace(" ","")}
                                                                        </li>
                                                            <li>
                                                                <img src="src/assets/images/connector.png"
                                                                    className="img-responsive full-width" />
                                                            </li>
                                                            <li>
                                                                <div className="time-km">
                                                                    <img src="src/assets/images/clock.png" />
                                                                    <label>{(segment["Duration"] / 60).toFixed(2)}HRS</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-3 col-sm-3 col-xs-12">
                                                        <ul>
                                                            <li>{segment["Destination"]["Airport"]["CityCode"]} | {segment["Destination"]["ArrTime"].split("T")[1]}</li>
                                                            <li>{segment["Destination"]["Airport"]["CityName"]}, {segment["Destination"]["Airport"]["CountryName"]}</li>
                                                            <li>{segment["Destination"]["ArrTime"].split("T")[0]}</li>
                                                            <li className="airport">{segment["Destination"]["Airport"]["AirportName"]},</li>
                                                        </ul>
                                                    </div>
                                                    <div
                                                        className="col-md-12 col-sm-12 col-xs-12 change-flight">
                                                        <p>Change flight in Indore Layover time 2:30 HRS</p>
                                                    </div>
                                                </div>
                                            </div>);
                                        })

                                        }
                                        <div className="line-20"></div>
                                        <div className="row no-gutter pb-10">
                                            <div
                                                className="d-like col-md-3 col-sm-3 col-sm-offset-6 col-xs-6">
                                                <p>Didnt like this hotel? </p>
                                            </div>
                                            <div className="choose-hotels col-md-3 col-sm-3 col-xs-6 pd-0">
                                                <button className="btn choose-btn form-control"
                                                    onClick={self.showflightModal}>
                                                    Change Flights
                                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 pd-0 flight-footer">
                                    <div className="departure">
                                        <h4>
                                            Return
                                                            <div className="time-km">
                                                <img src="src/assets/images/clock.png" />
                                                <label>3 HRS</label>
                                                <img src="src/assets/images/calendar.png" />
                                                <label>11 MAR</label>
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

               {self.state.showModal ? <FlightModal dialogClassName={"booking modal-custom-cls modal-lg"} daySelected={self.state.daySelected} showModal={self.state.showModal} days={daysArray} data={flightData} changeModalState={self.changeModalState} /> :null}
            </div>
        );
    }
}
