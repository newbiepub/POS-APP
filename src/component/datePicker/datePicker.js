import React from "react";
import {
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber} from '../text';
import {constantStyle} from '../../style/base';
import Moment from '../moment';
import _ from 'lodash';
import Date from './util/date';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.refDate = null;
        this.state = {
            // calendarWidth: width,
            current: Moment().startOf('month'),
            today: Moment()
        }
    }
    //
    // _computeDays = (date): Array<Array<Object>> => {
    //     let result = [];
    //     const currentMonth = date.month();
    //     let iterator = Moment(date);
    //     while (iterator.month() === currentMonth) {
    //         if (iterator.weekday() === 0 || result.length === 0) {
    //             result.push(_.times(7, _.constant({})));
    //         }
    //         let week = result[result.length - 1];
    //         let newDate = Moment(iterator);
    //         week[iterator.weekday()] = {
    //             date: newDate,
    //             valid: this.state.today < iterator,
    //         };
    //         // console.warn(week[iterator.weekday()].today)
    //         // Add it to the result here.
    //         iterator.add(1, 'day');
    //     }
    //     // console.warn(result)
    //     return result;
    // };
    _computeDays = (date): Array<Array<Object>> => {
        let result = [];
        const currentMonth = date.month();
        let iterator = Moment(date);
        for (let i = 0; i < iterator.weekday(); i++) {
            result.push({})
        }
        while (iterator.month() === currentMonth) {
            let newDate = Moment(iterator);

            result.push({
                date: newDate,
                valid: this.state.today < iterator,
            });
            iterator.add(1, 'day');
        }
        let length = iterator.add(-1, 'day').weekday()
        for (let i = 0; i < 7 - length; i++) {
            result.push({})
        }

        return result;
    };

    async getCalendarWidth(evt) {
        let w = evt.nativeEvent.layout.width;

        await this.setState({
            calendarWidth: w,

        })
    }

    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     let stateChanged = this.state != nextState;
    //     let widthChanged = this.state.calendarWidth != nextState.calendarWidth;
    //     return widthChanged || stateChanged
    //
    // }

    render() {

        return (
            <View style={style.container} onLayout={(event) => this.getCalendarWidth(event)}>
                <View style={{flexDirection: "row"}}>
                    <TouchableWithoutFeedback onPress={() => this.refDate.moveToPrevious()}>
                        <View>
                            <TextLarge>{"<"}</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                    <TextLarge
                        style={{textAlign: 'center', flex: 1}}>
                        {Moment(this.state.current).format('MMMM')}-{this.state.current.year()}</TextLarge>
                    <TouchableWithoutFeedback onPress={() => this.refDate.moveToNext()}>
                        <View>
                            <TextLarge>{">"}</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <RenderDay/>
                {
                    this.state.calendarWidth &&
                    <Date ref={(ref) => {
                        if (this.refDate === null)
                            this.refDate = ref
                    }
                    } width={this.state.calendarWidth}
                          position={[-this.state.calendarWidth, 0, this.state.calendarWidth]}
                          onSelectDate={(date)=>this.props.onSelectDate(date)}
                          selectedDate={this.props.selectedDate}
                          instance={this}/>
                }

            </View>
        )
    }
}

class RenderDay extends React.PureComponent {
    render() {
        let dayList = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        return (
            <View style={{flexDirection: 'row'}}>
                {
                    dayList.map((item) => {
                        return (
                            <View key={item} style={style.weekday}>
                                <View style={style.dayItem}>
                                    <TextNormal style={style.normalText}>{item}</TextNormal>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    normalText: {
        textAlign: 'center'
    },
    day: {
        position: 'absolute',
        flex: 1,
        height: 500,
        top: 0
    },
    weekday: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: constantStyle.color1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dayItem: {
        paddingVertical: 10
    },
    dateItemWrapper: {
        flex: 1,
        alignItems: 'center'

    },
    dateItemSelected: {
        backgroundColor: constantStyle.color1
    },
    dateItemSelectedText: {
        color: constantStyle.color2
    },
    dateItemToday: {
        backgroundColor: constantStyle.colorBorder
    },
    dateItemTodayText: {
        color: constantStyle.color2
    },
    dateItemBackground: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70
    },
    dateItemUnValidText: {
        color: constantStyle.colorBorder
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
export default DatePicker;