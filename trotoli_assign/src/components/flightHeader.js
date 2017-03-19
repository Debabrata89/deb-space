import React from 'react';
import $ from 'jquery';
import FlightBodyComponent from './box';

export default class flightHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { data: {} };
  }
  componentWillMount() {
    let self = this,
      data;
    $.ajax({
      // url: "http://tratoli.com/api/ttl_search_flight/",
      url: "src/components/data.json",
      type: 'GET',
      // type: 'POST',
      // data:
      // {
      //   "AdultCount": "1",
      //   "ChildCount": "0",
      //   "InfantCount": "0",
      //   "JourneyType": "1",
      //   "package_id": "151",
      //   "starting_city": "DEL",
      //   "ending_city": "BOM",
      //   "start_date": "2017-03-23"
      // },
      async: false,
      success: function (data) {
        self.setState({
          data: data
        });
      },
      error: function (err) {
        console.log(err);
      }
    });

  }
  render() {
    console.log(this.state.data);
    return (
      <div className="row no-gutter flights" id="flights">
        <div className="title">
          <h4>Flights</h4>
        </div>
        <FlightBodyComponent data={this.state.data} />
      </div>
    );
  }
}


