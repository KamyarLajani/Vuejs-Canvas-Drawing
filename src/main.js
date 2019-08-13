import Vue from 'Vue';
import styles from  '../styles.css';
import main from  './main.vue';

new Vue({
    el: '#app',
    render: h => h(main)
});