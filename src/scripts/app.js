// import * as _ from '../bower_components/lodash/lodash.js';
// import $ from '../bower_components/jquery/dist/jquery.js';
import {Tabs} from './Tabs';
import {Settings} from './Settings';
import {Gallery} from './Gallery';


document.addEventListener("DOMContentLoaded", function(event) {
	console.info('DOM Loaded');
	const $tabs = document.querySelector('.tabs');
	new Tabs($tabs);

	const $settings = document.querySelector('.settings')
	console.log('$settings ' , $settings);
	new Settings($settings);

	const $gallery = document.querySelector('.gallery')
	new Gallery($gallery);
});