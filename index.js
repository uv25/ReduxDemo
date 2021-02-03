/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Test, Share} from './src/screens/HomeScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//AppRegistry.registerComponent("Test", () => Test);
//AppRegistry.registerComponent("ShareMenuModuleComponent", () => Share);