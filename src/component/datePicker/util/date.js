import React from "react";
import {
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Animated,
    Easing
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber} from '../../text';
import {constantStyle} from '../../../style/base';
import Moment from '../../moment';


class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        // let date = Moment(this.props.currentDay);
        this.today = Moment(new Date());
        this.instance = this.props.instance;

        this.state = {
            isDone: true,
            data2: {
                index: 1,
                value: this.instance._computeDays(Moment(new Date()).startOf('month')),
                position: new Animated.Value(0)
            },
            data1: {
                index: 0,
                value: this.instance._computeDays(Moment(new Date()).startOf('month').add(-1, 'month')),
                position: new Animated.Value(-this.props.width)
            },

            data3: {
                index: 2,
                value: this.instance._computeDays(Moment(new Date()).startOf('month').add(1, 'month')),
                position: new Animated.Value(this.props.width)
            }

        };
        this.panResponder = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: () => true,

            onPanResponderMove: (e, gestureState) => {
                // Set the initial value to the current state
                Animated.parallel([
                    Animated.timing(
                        // Animate value over time
                        this.state.data1.position,
                        {
                            toValue: this.props.position[this.state.data1.index] + gestureState.dx,

                            duration: 0
                        }
                    ),
                    Animated.timing(
                        // Animate value over time
                        this.state.data2.position,
                        {
                            toValue: this.props.position[this.state.data2.index] + gestureState.dx,

                            duration: 0
                        }
                    ), Animated.timing(
                        // Animate value over time
                        this.state.data3.position,
                        {
                            toValue: this.props.position[this.state.data3.index] + gestureState.dx,
                            duration: 0
                        }
                    )

                ]).start(() => {
                    // callback
                });

            },
            onPanResponderRelease: (e, gesture) => {

                let v = Math.abs(gesture.vx > 2), x = Math.abs(gesture.dx);
                if ((v || x > this.props.width / 3) && gesture.dx < 0) {


                    this.moveToNext()

                } else if ((v || x > this.props.width / 3) && gesture.dx > 0) {

                    this.moveToPrevious()
                } else {
                    Animated.parallel([
                        Animated.timing(
                            // Animate value over time
                            this.state.data1.position,
                            {
                                toValue: this.props.position[this.state.data1.index],

                            }
                        ),
                        Animated.timing(
                            // Animate value over time
                            this.state.data2.position,
                            {
                                toValue: this.props.position[this.state.data2.index],

                            }
                        ), Animated.timing(
                            // Animate value over time
                            this.state.data3.position,
                            {
                                toValue: this.props.position[this.state.data3.index],

                            }
                        )

                    ]).start(() => {
                        // callback
                    });
                }

            }
        });
    }


    nextPosition(index) {
        if (index === 0) {
            return this.props.position[2];
        }
        else {
            return this.props.position[index - 1]
        }

    }

    async nextData(date) {

        if (this.state.data1.index === 0) {
            this.state.data1.value = await this.instance._computeDays(date.add(2, 'month'));
            this.state.data1.index = await  2;
        } else {
            this.state.data1.index = await this.state.data1.index - 1;
        }
        if (this.state.data2.index === 0) {
            this.state.data2.value = await this.instance._computeDays(date.add(2, 'month'));
            this.state.data2.index = await  2;
        } else {
            this.state.data2.index = this.state.data2.index - 1;
        }
        if (this.state.data3.index === 0) {
            this.state.data3.value = await this.instance._computeDays(date.add(2, 'month'));
            this.state.data3.index = await 2;
        } else {
            this.state.data3.index = await this.state.data3.index - 1;
        }
    }

    async moveToNext() {
        if(this.state.isDone)
        {
            await this.setState({
                isDone: false
            })
            let date = Moment(this.instance.state.current);
            await this.instance.setState({
                current: this.instance.state.current.add(1, 'month'),
            });
            await Animated.parallel([
                Animated.timing(
                    // Animate value over time
                    this.state.data1.position,
                    {
                        toValue: this.nextPosition(this.state.data1.index),
                        duration: this.state.data1.index > 0 ? 500 : 0,
                    }
                ),
                Animated.timing(
                    // Animate value over time
                    this.state.data2.position,
                    {
                        toValue: this.nextPosition(this.state.data2.index),
                        duration: this.state.data2.index > 0 ? 500 : 0,

                    }
                ), Animated.timing(
                    // Animate value over time
                    this.state.data3.position,
                    {
                        toValue: this.nextPosition(this.state.data3.index),
                        duration: this.state.data3.index > 0 ? 500 : 0,

                    }
                )

            ]).start(async () => {
                // callback
                await this.nextData(date);
                await this.setState({
                    isDone: true
                })
                this.forceUpdate()
            });
        }




    }

    previousPosition(index) {
        if (index === 2) {
            return this.props.position[0];
        }
        else {
            return this.props.position[index + 1]
        }

    }

    async previousData(date) {

        if (this.state.data1.index === 2) {
            this.state.data1.value = await this.instance._computeDays(date.add(-2, 'month'));
            this.state.data1.index = await 0;
        } else {
            this.state.data1.index = this.state.data1.index + 1;
        }
        if (this.state.data2.index === 2) {
            this.state.data2.value = await this.instance._computeDays(date.add(-2, 'month'));
            this.state.data2.index = 0;
        } else {
            this.state.data2.index = await this.state.data2.index + 1;
        }
        if (this.state.data3.index === 2) {
            this.state.data3.value = this.instance._computeDays(date.add(-2, 'month'));
            this.state.data3.index = await 0;
        } else {
            this.state.data3.index = await this.state.data3.index + 1;
        }
    }

    async moveToPrevious() {
        if(this.state.isDone)
        {
            await this.setState({
                isDone: false
            })
            let date = Moment(this.instance.state.current);
            await this.instance.setState({
                current: this.instance.state.current.add(-1, 'month'),
            });
            await Animated.parallel([
                Animated.timing(
                    // Animate value over time
                    this.state.data1.position,
                    {
                        toValue: this.previousPosition(this.state.data1.index),
                        duration: this.state.data1.index < 2 ? 500 : 0,
                    }
                ),
                Animated.timing(
                    // Animate value over time
                    this.state.data2.position,
                    {
                        toValue: this.previousPosition(this.state.data2.index),
                        duration: this.state.data2.index < 2 ? 500 : 0,

                    }
                ), Animated.timing(
                    // Animate value over time
                    this.state.data3.position,
                    {
                        toValue: this.previousPosition(this.state.data3.index),
                        duration: this.state.data3.index < 2 ? 500 : 0,

                    }
                )

            ]).start(async () => {
                // callback
                await this.previousData(date);
                await this.setState({
                    isDone: true
                })
                this.forceUpdate()
            });
        }



    }

    _renderWeekDayItem = (dayItem) => {
        dayItem = dayItem.item || {};
        let selected = dayItem.date != undefined && dayItem.date.isSame(this.props.selectedDate, 'day'),
            today = dayItem.date != undefined && dayItem.date.isSame(this.today, 'day');

        return (
            <TouchableWithoutFeedback onPress={() => {
                if (dayItem.valid)
                    this.props.onSelectDate(dayItem.date)
            }}>
                <View style={[style.dateItemWrapper]}>
                    <View
                        style={[style.dateItemBackground, today && style.dateItemToday, selected && style.dateItemSelected]}>
                        <TextLarge
                            style={[style.normalText, !dayItem.valid && style.dateItemUnValidText, today && style.dateItemTodayText, selected && style.dateItemSelectedText]}>{dayItem.date != undefined && dayItem.date.date()}</TextLarge>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    render() {
        return (
            <View style={{flex: 1}}  {...this.panResponder.panHandlers}>
                {/*/!*Previous*!/*/}
                <Animated.View style={[style.day, {
                    left: this.state.data1.position,
                    width: this.props.width,
                }]}>
                    <Calendar data={this.state.data1.value}
                              selectedDate={this.props.selectedDate}
                              renderItem={this._renderWeekDayItem}
                              today={this.today}/>
                </Animated.View>

                {/*Current*/}
                <Animated.View style={[style.day, {
                    left: this.state.data2.position,
                    width: this.props.width,
                }]}>
                    <Calendar data={this.state.data2.value}
                              index={1}
                              selectedDate={this.props.selectedDate}
                              renderItem={this._renderWeekDayItem}/>
                </Animated.View>
                {/*/!*Next*!/*/}
                <Animated.View style={[style.day, {
                    left: this.state.data3.position,
                    width: this.props.width,
                }]}>
                    <Calendar data={this.state.data3.value}
                              selectedDate={this.props.selectedDate}
                              renderItem={this._renderWeekDayItem}
                    />
                </Animated.View>

            </View>
        )
    }
}

class Calendar extends React.PureComponent {
    render() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={(item, index) => index}
                numColumns={7}
                extraData={this.props}
                initialNumToRender={this.props.index === 1 ? 5 : 0}
                getItemLayout={(data, index) => (
                    {length: 30, offset: 30 * index, index}
                )}
                scrollEnabled={false}
                renderItem={this.props.renderItem}
            />
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
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