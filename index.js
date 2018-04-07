import { AppRegistry } from 'react-native';
import App from './App';

// Create methods
Number.prototype.seperateNumber = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

AppRegistry.registerComponent('pos', () => App);
