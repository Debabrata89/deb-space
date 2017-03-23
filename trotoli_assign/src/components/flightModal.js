import React from 'react';
import Select2 from 'react-select2-wrapper';
import { Modal, Popover, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
export default class flightHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: props.showModal,
            selectedDay: props.daySelected,
            stopsArray: [],
            deptArray: [],
            airlinesArray: [],
            fareClassArray: [],
            selectedStop: '',
            selectedFareType: '',
            selectedAirlines: '',
            selectedArrTime: '',
            selectedDepartureTime: '',
            selectedFareClass: '',
            isAscendingDepart: true,
            flightsArray: props.data[props.daySelected]["Response"]["Results"][0],
            sortDirectionDepTime: "",
            sortDirectionArrTime: "",
            sortDirectionPrice: "asc",
            sortDirectionDuration: ""
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.changeDay = this.changeDay.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.getImage = this.getImage.bind(this);
    }
    // sortFlight(sortKey, sortType, event) {
    //     console.log("data", sortKey, sortType);
    //     let self = this;
    //     let flightsArray = self.state.flightsArray;
    //     console.log("flight array", flightsArray);
    //     let sortKeyParent = sortKey === 'DepTime' ? 'Origin' : 'Destination';
    //     flightsArray.sort((flight1, flight2) => {
    //         let time1 = flight1["Segments"][0][0][sortKeyParent][sortKey].split("T")[1].split(":");
    //         let time2 = flight2["Segments"][0][0][sortKeyParent][sortKey].split("T")[1].split(":");
    //         if (sortType === 'asc') {
    //             if (parseInt(time1[0]) === parseInt(time2[0]) && parseInt(time1[1]) == parseInt(time2[1]) && parseInt(time1[2]) == parseInt(time2[2])) {
    //                 return 0;
    //             } else if (parseInt(time1[0]) < parseInt(time2[0])) {
    //                 return 1;
    //             } else {
    //                 return -1;
    //             }
    //         } else {
    //             if (parseInt(time1[0]) === parseInt(time2[0]) && parseInt(time1[1]) == parseInt(time2[1]) && parseInt(time1[2]) == parseInt(time2[2])) {
    //                 return 0;
    //             } else if (parseInt(time1[0]) > parseInt(time2[0])) {
    //                 return 1;
    //             } else {
    //                 return -1;
    //             }
    //         }


    //     });



    //     self.setState({ flightsArray: flightsArray });
    // }
    sortDuration(sortKey, sortType, event) {
        console.log("data", sortKey, sortType);
        let self = this;
        let flightsArray = self.state.flightsArray;
        flightsArray.map((flight, index) => {
            flight["Segments"][0].sort((segment1, segment2) => {
                if (sortType === 'asc') {
                    if (segment1.Duration === segment2.Duration) {
                        return 0;
                    } else if (segment1.Duration > segment2.Duration) {
                        return 1;
                    } else {
                        return -1
                    }

                } else {
                    if (segment1.Duration === segment2.Duration) {
                        return 0;
                    } else if (segment1.Duration < segment2.Duration) {
                        return 1;
                    } else {
                        return -1
                    }
                }
            });




        });



        self.setState({ flightsArray: flightsArray, sortDirectionDuration: sortType });
    }

    sortFlight(sortKey, sortType, event) {
        console.log("data", sortKey, sortType);
        let self = this;
        let flightsArray = self.state.flightsArray;
        console.log("flight array", flightsArray);
        let sortKeyParent = sortKey === 'DepTime' ? 'Origin' : 'Destination';
        let departOrArrKey = sortKey === 'DepTime' ? 'sortDirectionDepTime' : 'sortDirectionArrTime';
        flightsArray.sort((flight1, flight2) => {
            let time1 =sortKey === 'DepTime'? flight1["Segments"][0][0][sortKeyParent][sortKey].split("T")[1].split(":") : flight1["Segments"][0][flight1["Segments"][0].length-1][sortKeyParent][sortKey].split("T")[1].split(":");
            let time2 =sortKey === 'DepTime' ?  flight2["Segments"][0][0][sortKeyParent][sortKey].split("T")[1].split(":") : flight2["Segments"][0][flight2["Segments"][0].length-1][sortKeyParent][sortKey].split("T")[1].split(":");
            if (sortType === 'asc') {
                if (parseInt(time1[0]) === parseInt(time2[0]) && parseInt(time1[1]) == parseInt(time2[1]) && parseInt(time1[2]) == parseInt(time2[2])) {
                    return 0;
                } else if (parseInt(time1[0]) > parseInt(time2[0])) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (parseInt(time1[0]) === parseInt(time2[0]) && parseInt(time1[1]) == parseInt(time2[1]) && parseInt(time1[2]) == parseInt(time2[2])) {
                    return 0;
                } else if (parseInt(time1[0]) < parseInt(time2[0])) {
                    return 1;
                } else {
                    return -1;
                }
            }


        });



        self.setState({ flightsArray: flightsArray, [departOrArrKey]: sortType });
    }


    sortPrice(sortKey, sortType, event) {
        console.log("data", sortKey, sortType);
        let self = this;
        let flightsArray = self.state.flightsArray;
        console.log("flight array", flightsArray);
        flightsArray.sort((flight1, flight2) => {

            if (sortType === 'asc') {
                if (parseInt(flight1['Price'][sortKey]) === parseInt(flight2['Price'][sortKey])) {
                    return 0;
                } else if (parseInt(flight1['Price'][sortKey]) > parseInt(flight2['Price'][sortKey])) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (parseInt(flight1['Price'][sortKey]) === parseInt(flight2['Price'][sortKey])) {
                    return 0;
                } else if (parseInt(flight1['Price'][sortKey]) < parseInt(flight2['Price'][sortKey])) {
                    return 1;
                } else {
                    return -1;
                }
            }


        });

        self.setState({ flightsArray: flightsArray, sortDirectionPrice: sortType });
    }
    componentWillMount() {
        let flightsArray = this.state.flightsArray;
        let oneStop = [],
            airlineNamesArray = [],
            fareClassArray = [];
        flightsArray.map((flight, flightIndex) => {
            if (oneStop.length === 0) {
                oneStop.push(flight["Segments"][0].length - 1);
            } else {
                if (oneStop.indexOf(flight["Segments"][0].length - 1) == -1) {
                    oneStop.push((flight["Segments"][0].length - 1));
                }
            }

            flight["Segments"][0].map((segment, index) => {
                if (airlineNamesArray.length === 0) {
                    airlineNamesArray.push(segment['Airline']['AirlineName']);
                } else {
                    if (airlineNamesArray.indexOf(segment['Airline']['AirlineName']) === -1) {
                        airlineNamesArray.push(segment['Airline']['AirlineName']);
                    }
                }
            });

            flight["Segments"][0].map((segment, index) => {
                if (fareClassArray.length === 0) {
                    fareClassArray.push(segment['Airline']['FareClass']);
                } else {
                    if (fareClassArray.indexOf(segment['Airline']['FareClass']) === -1) {
                        fareClassArray.push(segment['Airline']['FareClass']);
                    }
                }
            });

        });
        oneStop.sort();
        airlineNamesArray.sort();
        fareClassArray.sort();
        oneStop = oneStop.map((value, index) => {
            if (value === 0) {
                return "Direct"
            } else {
                return value + '-Stop';
            }
        });
        oneStop.unshift("All");
        airlineNamesArray.unshift("All");
        fareClassArray.unshift("All");
        console.log("airlineNamesArray array", airlineNamesArray);
        this.setState({ stopsArray: oneStop, airlinesArray: airlineNamesArray, fareClassArray: fareClassArray });
    }
    cbChange(data, event) {
        // console.log(data,event.target.value, arguments);
        let self = this;
        self.setState({ [data]: event.target.value });

    }
    changeDay(event) {
        console.log("this", event.target);
        let day = event.target.id;
        let self = this;
        this.setState({ selectedDay: day, flightsArray: self.props.data[day]["Response"]["Results"][0] });
    }
    getImage(value) {
        if (value == 'CZ' || value == 'IX') {
            return value + '.jpg';
        }
        return value + '.gif';
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
        let flightsArray = this.state.flightsArray;
        let offeredFare = 0;
        let refundable = "";
        let noOfStops = 0;

        const getSelectedDeparturevalue = function (time, flightTime) {
            let timeMinSuffix = time.split("-")[0].substr(-2);
            let minTime = timeMinSuffix === 'PM' ? (parseInt(time.split("-")[0].split(timeMinSuffix)[0]) + 12) : (parseInt(time.split("-")[0].split(timeMinSuffix)[0]) == 12) ? 0 : parseInt(time.split("-")[0].split(timeMinSuffix)[0]);
            let timeMaxSuffix = time.split("-")[1].substr(-2);
            let maxTime = timeMaxSuffix === 'PM' ? (parseInt(time.split("-")[1].split(timeMaxSuffix)[0]) + 12) : (parseInt(time.split("-")[1].split(timeMaxSuffix)[0]) == 12) ? 0 : parseInt(time.split("-")[1].split(timeMaxSuffix)[0]);
            console.log("mixman", minTime, maxTime);
            if (parseInt(flightTime.split(":")[0]) >= minTime) {
                if (parseInt(flightTime.split(":")[0]) < maxTime) {
                    return true;
                } else if (parseInt(flightTime.split(":")[0]) === maxTime && parseInt(flightTime.split(":")[1]) == 0 && parseInt(flightTime.split(":")[2]) == 0) {
                    return true;
                } else {
                    return false;
                }
            }

        }


        const getSelectedArrvalue = function (time, flightTime) {
            let timeMinSuffix = time.split("-")[0].substr(-2);
            let minTime = timeMinSuffix === 'PM' ? (parseInt(time.split("-")[0].split(timeMinSuffix)[0]) + 12) : parseInt(time.split("-")[0].split(timeMinSuffix)[0]);
            let timeMaxSuffix = time.split("-")[1].substr(-2);
            let maxTime = timeMaxSuffix === 'PM' ? (parseInt(time.split("-")[1].split(timeMaxSuffix)[0]) + 12) : parseInt(time.split("-")[1].split(timeMaxSuffix)[0]);
            console.log("mixman", minTime, maxTime);
            if (parseInt(flightTime.split(":")[0]) >= minTime) {
                if (parseInt(flightTime.split(":")[0]) < maxTime) {
                    return true;
                } else if (parseInt(flightTime.split(":")[0]) === maxTime && parseInt(flightTime.split(":")[1]) == 0 && parseInt(flightTime.split(":")[2]) == 0) {
                    return true;
                } else {
                    return false;
                }
            }

        }

        if ((this.state.selectedStop === "" || this.state.selectedStop === "All") && (this.state.selectedFareType === "" || this.state.selectedFareType === "All")
            && (this.state.selectedAirlines === "" || this.state.selectedAirlines === "All") && (this.state.selectedDepartureTime === "" || this.state.selectedDepartureTime === "All")
            && (this.state.selectedArrTime === "" || this.state.selectedArrTime === "All")
            && (this.state.selectedFareClass === "" || this.state.selectedFareClass === "All")) {
            flightsArray = flightsArray;
            console.log("flight array", flightsArray);
        } else {
            flightsArray = flightsArray.filter((flight, index) => {
                let selectedStopFlag = false;
                let selectedFareType = false;
                let selectedAirlines = false;
                let selectedDepartureTime = false;
                let selectedArrTime = false;
                let selectedFareClass = false;



                if (self.state.selectedStop === 'All' || self.state.selectedStop === "") {
                    selectedStopFlag = true;
                } else if ((flight["Segments"][0].length - 1) === 0 && (self.state.selectedStop === 'Direct')) {
                    selectedStopFlag = true;
                } else if ((flight["Segments"][0].length - 1) + '-Stop' === self.state.selectedStop) {
                    selectedStopFlag = true;
                }

                if (self.state.selectedFareType === 'All' || self.state.selectedFareType === '') {
                    selectedFareType = true;
                }
                else if (self.state.selectedFareType === 'Refundable' && flight.IsRefundable) {
                    selectedFareType = true;
                } else if (self.state.selectedFareType === 'NonRefundable' && !flight.IsRefundable) {
                    selectedFareType = true;
                }


                if (self.state.selectedAirlines === 'All' || self.state.selectedAirlines === "") {
                    selectedAirlines = true;
                } else {
                    flight["Segments"][0].map((segment, index) => {
                        if (segment['Airline']['AirlineName'] === self.state.selectedAirlines) {
                            selectedAirlines = true;
                        }
                    });
                }

                if (self.state.selectedDepartureTime === 'All' || self.state.selectedDepartureTime === "") {
                    selectedDepartureTime = true;
                } else {
                    selectedDepartureTime = getSelectedDeparturevalue(self.state.selectedDepartureTime, flight["Segments"][0][0]["Origin"]["DepTime"].split("T")[1]);
                }

                if (self.state.selectedArrTime === 'All' || self.state.selectedArrTime === "") {
                    selectedArrTime = true;
                } else {
                    selectedArrTime = getSelectedArrvalue(self.state.selectedArrTime, flight["Segments"][0][flight["Segments"][0].length - 1]["Destination"]["ArrTime"].split("T")[1]);
                }

                if (self.state.selectedFareClass === 'All' || self.state.selectedFareClass === "") {
                    selectedFareClass = true;
                } else {
                    flight["Segments"][0].map((segment, index) => {
                        if (segment['Airline']['FareClass'] === self.state.selectedFareClass) {
                            selectedFareClass = true;
                        }
                    });
                }

                flight.OriginalIndex = index;
                return selectedStopFlag && selectedFareType && selectedAirlines && selectedDepartureTime && selectedArrTime && selectedFareClass;
            });


        }
        console.log("original array", flightsArray);

        return (
            <div className="flight-popup">
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
                                            <label className="filter-by modal-filter-by-cls">Filter By </label>
                                            <div className="col-md-12 col-sm-12 col-xs-12 pd-0">
                                                <Select2
                                                    data={self.state.stopsArray}
                                                    value={self.state.selectedStop}
                                                    onSelect={self.cbChange.bind(this, 'selectedStop')}
                                                    options={
                                                        {
                                                            placeholder: 'STOPS',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    data={["All", "12AM-6AM", "6AM-12PM", "12PM-6PM", "6PM-12AM"]}
                                                    value={self.state.selectedDepartureTime}
                                                    onSelect={self.cbChange.bind(this, 'selectedDepartureTime')}

                                                    options={
                                                        {
                                                            placeholder: 'DEPART TIME',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    onSelect={self.cbChange.bind(this, 'selectedFareType')}
                                                    value={self.state.selectedFareType}
                                                    data={['All', 'Refundable', 'NonRefundable']}
                                                    options={
                                                        {
                                                            placeholder: 'FARE TYPE',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    onSelect={self.cbChange.bind(this, 'selectedAirlines')}
                                                    autoComplete={true}
                                                    value={self.state.selectedAirlines}
                                                    data={self.state.airlinesArray}
                                                    options={
                                                        {
                                                            placeholder: 'AIRLINES',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    onSelect={self.cbChange.bind(this, 'selectedArrTime')}
                                                    data={["All", "12AM-6AM", "6AM-12PM", "12PM-6PM", "6PM-12AM"]}
                                                    value={self.state.selectedArrTime}
                                                    options={
                                                        {
                                                            placeholder: 'Arr Time',
                                                        }
                                                    }
                                                />
                                                <Select2
                                                    onSelect={self.cbChange.bind(this, 'selectedFareClass')}
                                                    data={self.state.fareClassArray}
                                                    value={self.state.selectedFareClass}
                                                    options={
                                                        {
                                                            placeholder: 'Fare Class',
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
                                        <div className="col-md-2 col-sm-2 col-xs-2" onClick={this.sortFlight.bind(this, 'DepTime', self.state.sortDirectionDepTime == "" ? 'asc' : (self.state.sortDirectionDepTime == 'asc') ? 'des' : 'asc')}>
                                            Depart
                                            <span className={self.state.sortDirectionDepTime === "asc" ? "glyphicon glyphicon-arrow-up" : (self.state.sortDirectionDepTime === "des") ? "glyphicon glyphicon-arrow-down" : ""} onClick={this.sortFlight.bind(this, 'DepTime', self.state.sortDirectionDepTime === "asc" ? 'des' : 'asc')}> </span>
                                        </div>
                                        <div className="col-md-4 col-sm-2 col-xs-2" onClick={this.sortDuration.bind(this, 'Duration', self.state.sortDirectionDuration == "" ? 'asc' : (self.state.sortDirectionDuration == 'asc') ? 'des' : 'asc')} >
                                            Duration
                                             <span className={self.state.sortDirectionDuration === "asc" ? "glyphicon glyphicon-arrow-up" : (self.state.sortDirectionDuration === "des") ? "glyphicon glyphicon-arrow-down" : ""} onClick={this.sortFlight.bind(this, 'Duration', self.state.sortDirectionDuration === "asc" ? 'des' : 'asc')}> </span>
        
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2" onClick={this.sortFlight.bind(this, 'ArrTime', self.state.sortDirectionArrTime == "" ? 'asc' : (self.state.sortDirectionArrTime == 'asc') ? 'des' : 'asc')}>
                                            Arrive
                                             <span className={self.state.sortDirectionArrTime === "asc" ? "glyphicon glyphicon-arrow-up" : (self.state.sortDirectionArrTime === "des") ? "glyphicon glyphicon-arrow-down" : ""} onClick={this.sortFlight.bind(this, 'ArrTime', self.state.sortDirectionArrTime === "asc" ? 'des' : 'asc')}> </span>
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2" onClick={this.sortPrice.bind(this, 'OfferedFare', self.state.sortDirectionPrice == 'asc' ? 'des' : 'asc')} >
                                            Price
                                             <span className={self.state.sortDirectionPrice === 'asc' ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down"} onClick={this.sortPrice.bind(this, 'OfferedFare', self.state.sortDirectionPrice == 'asc' ? 'des' : 'asc')}></span>
                                        </div>
                                    </div>
                                    {

                                        flightsArray.map((flight, flightIndex) => {
                                            offeredFare = flight["Price"]["OfferedFare"];
                                            refundable = flight['IsRefundable'] ? 'Refundable' : 'NonRefundable';
                                            noOfStops = flight["Segments"][0].length;
                                            let OriginalIndex = typeof (flight["OriginalIndex"]) === "undefined" ? "" : flight["OriginalIndex"];
                                            let data = flight["Segments"][0].map((segment, index) => {
                                                return (<div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="row no-gutter text-center flight-row" onClick={self.refreshData}>
                                                    <img data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="connector" src="src/assets/images/flight-conector.png" />
                                                    <div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="col-md-2 col-sm-2 col-xs-2 flight-logo">
                                                        <img data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} src={"src/assets/images/" + self.getImage(segment['Airline']['AirlineCode'])} />
                                                        <p data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Airline']['AirlineCode']}</p>
                                                    </div>
                                                    <div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4 data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Origin']['Airport']['CityCode']}</h4>
                                                        <h4 data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Origin']['DepTime'].split("T")[1]}</h4>
                                                        <p data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="col-md-4 col-sm-4 col-xs-4">
                                                        <h4 data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Duration']}</h4>
                                                        <p data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex}>{segment['Origin']['DepTime'].split("T")[0]}</p>
                                                    </div>
                                                    <div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                        <h4 data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex}>{segment['Destination']['Airport']['CityCode']}</h4>
                                                        <h4 data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex}>{segment['Destination']['ArrTime'].split("T")[1]}</h4>
                                                        <p data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} >{segment['Destination']['ArrTime'].split("T")[0]}</p>
                                                    </div>
                                                    {index === 0 ?
                                                        <div data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="col-md-2 col-sm-2 col-xs-2">
                                                            <button data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex} className="btn form-control price-btn">{offeredFare}</button>
                                                            <p data-flightindex={OriginalIndex !== "" ? OriginalIndex : flightIndex}>{refundable}</p>
                                                        </div> : null
                                                    }
                                                    {(noOfStops - 1 === index) ? <hr id="flight-border" /> : null}
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


