import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Image, Icon, Dimensions, TouchableHighlight, ActivityIndicator, FlatList} from 'react-native';
import Text from '../config/AppText';
import moment from "moment";
import PercentageCircle from 'react-native-percentage-circle';
import PropTypes from 'prop-types';
import PrehabApi from '../services/PrehabApi';
import Swiper from 'react-native-swiper';

export class AlertScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: ( 
        <TouchableOpacity
            key={"alert"}
            onPress={() => navigation.navigate('DrawerOpen')}
        >
        <Image
        resizeMode='cover'
        style={styles.headerLeft}
        source={require('../assets/img/menu.png')}
        />
        </TouchableOpacity>
    ),
    headerTitle: (
        <Image
        resizeMode='cover'
        style={styles.headerTitle}
        source={require('../assets/img/logo_1_alt.png')}
        /> 
    ),
    headerStyle: {backgroundColor:'#F8F9FE',borderColor:'#F8F9FE'}, 
    headerTintColor: '#000000', 
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1,fontSize: 24,fontWeight: "normal",width: "35%" },
    headerRight: (
        <TouchableOpacity
            key={"alert"}
            onPress={() => navigation.navigate('AlertScreen')}
        >
        <Image
        resizeMode='cover'
        style={styles.headerRight}
        source={require('../assets/img/alarm.png')}
        /> 
        </TouchableOpacity>
    ),
  });
  constructor(props){
    super(props);
    this.state = { isLoading: true, initialIndex: 0, contador: 0, feitos: 0, contador2:0, feitos2:0}
    this.prehabApi = new PrehabApi();
  }

  componentDidMount(){
    this.prehabApi.getPrehabPlan()
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {

        let index = 0;

        Object.entries(responseJson.data.task_schedule).map((exercises, i) => { 
          const unorderedSchedule = responseJson.data.task_schedule;
          const ordered = {};
          
          Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
            ordered[key] = unorderedSchedule[key];
          });
    
          let date = Object.keys(ordered)[i];

          if (moment(date).isSame(moment(), 'day')) {
            index = i;
          }

        });

        this.setState({
          isLoading: false,
          taskSchedule: responseJson.data.task_schedule,
          initialIndex: index,
          ActualDay: index,
        }, function(){
        });

      } else {          
      }
    }).catch(error => {
        console.error(error);
    });
  }

  sortDate(a, b) {
    return new Date(a).getTime() - new Date(b).getTime();
  }

  render() {

    if (this.state.isLoading) {
        return(
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" style={styles.activityIndicator} color="#FE005C"/>
          </View>
        )
      }

      let Count = 0;
      let Done = 0;
      let Count2 = 0;
      let Done2 = 0;
  
      const dayExercises = Object.entries(this.state.taskSchedule).map((exercises, i) => { 
  
        const orderedSchedule = {};
        const unorderedSchedule = this.state.taskSchedule;
        Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
          orderedSchedule[key] = unorderedSchedule[key];
        });
  
        let date = Object.keys(orderedSchedule)[i];
        let ActualDate = Object.keys(orderedSchedule)[this.state.ActualDay];
        let tasks = orderedSchedule[date];

    if(date === ActualDate){
    return (
    <View style={styles.containerGeneral}>
        <Text style={styles.titulo}>Alertas</Text>
        <Text style={styles.data}>{date}</Text>
        <Text style={styles.littlebox}>Exercicios por realizar:</Text>
        <View style = {styles.lista}>
        <FlatList 
            data={tasks}
            keyExtractor={(item, index) => 'list-item-${index}'}
            renderItem={ ({item}) => {
            if(item['status'] === 'Completed'){
                Count = Count + 1;
                Done = Done + 1;
                this.setState({contador:Count, feitos:Done})
            } 
            else if(item['status'] === 'Pending'){
                Count = Count + 1;
                this.setState({contador:Count})
            return (
                <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.externalView}>            
                        <View style={styles.internalView}>  
                            <View style={styles.viewText}>
                                <Text style={styles.header}>{item['title']}</Text>
                            </View>
                         </View>
                    </View>
                    <TouchableOpacity
                        key={"alert"}
                        onPress={() => {this.props.navigation.navigate('ExerciseScreen')}}
                        >
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/img/tick.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
                </View>
            );
                }
            else {
                Count = Count + 1;
                this.setState({contador:Count})
            }
         }}
         >
        </FlatList>
        </View>
        <Text style={styles.littlebox}>Nutrição:</Text>
        <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.externalView}>            
                        <View style={styles.internalView}>  
                            <View style={styles.viewText}>
                                <Text style={styles.header}>Siga o plano de Nutrição!</Text>
                            </View>
                         </View>
                    </View>
                    <TouchableOpacity
                        key={"alert"}
                        onPress={() => {this.props.navigation.navigate('NutritionScreen')}}
                        >
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/img/tick.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
        </View>
        <View style={styles.graphBox}>
              <Text style={styles.texto}>Tarefas realizadas:</Text>  
                <View style={styles.graph}>
                  <PercentageCircle radius={42} percent={parseInt((this.state.feitos/this.state.contador)*100)} color={"#FE005C"} bgcolor= {'#B7F8DB'} borderWidth={8} textStyle={{fontSize: 24, color: '#323BEA'}}></PercentageCircle>
                </View>
              <Text style={styles.texto}>Continue com o bom trabalho!</Text>
        </View>    
    </View>
         );
    } else if(date < ActualDate){
        return (
        <View style={styles.containerGeneral}>     
            <Text style={styles.titulo}>Alertas</Text>
            <Text style={styles.data}>{date}</Text>
        <View style={styles.graphBoxN}>
        <Text style={styles.texto}>Este dia já passou, bom trabalho e boa sorte para os dias seguintes!</Text>
        </View>
        </View> 
        );  
    } else {
        return (
        <View style={styles.containerGeneral}>
            <Text style={styles.titulo}>Alertas</Text>
            <Text style={styles.data}>{date}</Text>
        <View style={styles.graphBoxN}>
        <Text style={styles.texto}>Tarefas realizadas:</Text>  
          <View style={styles.graph}>
            <PercentageCircle radius={42} percent={0} color={"#FE005C"} bgcolor= {'#B7F8DB'} borderWidth={8} textStyle={{fontSize: 24, color: '#323BEA'}}></PercentageCircle>
          </View>
        <Text style={styles.texto}>Ainda não chegaste a este dia. Tudo a seu tempo!</Text>
        </View>
        </View> 
        );  
    }   
    }); 
    return (
        <View style={styles.conWrapper}>
          <Swiper style={styles.wrapper}
                  showsButtons
                  showsPagination={false}
                  loop={false}
                  nextButton={<Text style={styles.buttonText}>›</Text>}
                  prevButton={<Text style={styles.buttonText}>‹</Text>}
                  index={this.state.initialIndex}
          >
            {dayExercises}
          </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({

    lista: {
        height: Dimensions.get('window').height * 0.30
    },
    buttonText: {
        color: '#FE005C',
        fontSize: 50,
    },
    conWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    wrapper: {
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    externalView: {
        flex: 1,
        flexDirection:'row',
        margin: 8
    },
    internalView: {
        flex: 1,
        flexDirection:'row',            
    },
    header: {
        color:'#323BEA',
        padding: 4,
        marginBottom: 20,
        marginLeft:8,
        fontSize: 20, 
        flexDirection: 'row',
    },
    viewText: {
        flex: 1,
        flexDirection:'column',   
        height: 42
    },
    container   : {
        width: Dimensions.get('window').width * 0.80,
        marginLeft: Dimensions.get('window').width * 0.1,
        margin:5,
        borderRadius:50,
        borderWidth: 2,
        backgroundColor: '#F8F9FE',
        borderColor: '#BCE0FD',
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row',
        textAlign: 'center'  
    },
    title : {
        flex    : 1,
        padding : 10,
        color   :'#323BEA',
    },
    buttonImage : {
        width: 32, 
        height: 32, 
        margin: 12,
        alignContent:'flex-end'
    },
    body: {
        width: Dimensions.get('window').width * 1.5,
    },
    graphBox: {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        //marginTop: Dimensions.get('window').width* 0.01,
    },
    graphBoxN: {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').width* 0.35,
    },
    data: {
        color: '#323BEA',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: Dimensions.get('window').width * 0.018,
    },
    littlebox: {
        color: '#7AC4FF',
        fontSize: 18,
        marginLeft: Dimensions.get('window').width * 0.1,
    },
    alertaBoxCheck: {
        margin: Dimensions.get('window').width * 0.04,
        width: 18,
        height: 18,
        justifyContent: 'flex-end',
    },
    alertaBoxText:{
        color: '#FE005C',
        fontSize: 18,
        margin: Dimensions.get('window').width * 0.04,
    },
    alertaBox:{
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: '#F8F9FE',
        borderColor: '#323BEA',
        borderRadius:50,
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.8,
    },
    graph:{
        alignSelf: 'center'
    },
    titulo:{
        color: '#323BEA',
        fontSize: 32,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
    },
    texto:{
        color: '#7AC4FF',
        fontSize: 18,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
    },
    headerLeft: {
        margin: 10,
        width: 24,
        height: 24,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerTitle: {
        flex:1,
        fontWeight: 'normal',
        width: 85,
        height: Dimensions.get('window').width * 0.09,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerRight: {
        margin: 8,
        width: 24,
        height: 24,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    containerGeneral: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
    },
});