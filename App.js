import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import GoogleFit from 'react-native-google-fit';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var data={};

GoogleFit.onAuthorize(() => {
  console.log('AUTH SUCCESS');
});

GoogleFit.authorize();

const options = {
  startDate: "2019-02-11T00:00:17.971Z", // required ISO8601Timestamp
  endDate: new Date().toISOString() // required ISO8601Timestamp
};
 
GoogleFit.getDailyStepCountSamples(options, (err, res) => {
  if (err) {
    throw err;
  }
  // console.log("Daily steps >>>", res);
  data.step=res;
});

// GoogleFit.getDailyCalorieSamples(options, (err, res) => {
//   if (err) {
//     throw err;
//   }
//   // console.log("Daily Calories >>>", res);
//   data.cal=res;
// });

// GoogleFit.getDailyDistanceSamples(options, (err, res) => {
//   if (err) {
//     throw err;
//   } 
//   // console.log("Daily Distance >>>", res);
//   data.dist=res;
// });


export default class App extends Component{
  constructor()
  {
    super();

    this.state={
      isLoading:true,
      UserDetails:{}
    }
  }
  renderDataOrSpinner()
  {
    if(this.state.isLoading)
    {
      return(

        <View style={styles.mainComp}>
        <Text style={styles.textComp}>Loading User Details</Text>
        </View>
      )
    }
    else
    {
      return(
        <View>
        <Text style={styles.textComp}>Number of Steps Today:</Text>
        <Text style={styles.textComp}>{this.state.UserDetails[0].steps[1].value}</Text>
        </View>
      )
    }
  }
  componentDidMount()
  {
    const options = {
      startDate: "2019-02-11T00:00:17.971Z", // required ISO8601Timestamp
      endDate: new Date().toISOString() // required ISO8601Timestamp
    };
     
    GoogleFit.getDailyStepCountSamples(options, (err, res) => {
      if (err) {
        throw err;
      }
      else{
        this.setState(
          {
            isLoading:false,
            UserDetails:res
          })
      }
    }); 
  }

  render()
  {
    return(
      <View>
      {this.renderDataOrSpinner()}
      </View>
     
    )
  }
}



const styles ={
  mainComp:{
    marginTop:20,
    alignItems:'center'
  },
  textComp:
  {
    marginTop:25,
    marginLeft:25,
    fontSize:30,
    fontWeight:'400'
  }
};
