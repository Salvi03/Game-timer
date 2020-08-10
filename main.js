Vue.component("timer", {
    props: {
        mins: {
            type: Number,
            required: true
        },

        secs: {
            type: Number,
            required: true
        },

        interval: {
            type: Number,
            required: false
        }
    },

    methods: {
        getTimer: function() {
            return `${ this.mins }:${ this.secs }`;
        },

    },

    data: function(){
        return {
            minutes: this.mins,
            seconds: this.secs,

            isInterval: false,
            isStopped: false
        }
    },

    template: `
        <div class="container justify-content-center">
            <h1>{{ getTimer() }}</h1>
        </div>
    `
})

var app = new Vue({
    el: "#app",

    data: {
        mins: null,
        secs: null,
        interval: null,
        isStopped: false,
        isStarted: false,
        submitted: false,

        timerdata: {
            minutes: null,
            seconds: null,
            interval: null
        }
    },

    methods: {
        timer: function() {
            
            if (this.mins == 0) {
                if (this.secs == 0 && !this.isInterval) {
                    this.secs = this.interval;
                    this.isInterval = true;
                } else if (this.secs == 0 && this.isInterval) {
                    this.mins = this.timerdata.minutes;
                    this.secs = this.timerdata.seconds;
                    this.isInterval = false;
                } else {
                    this.secs--;
                }
            } else {
                if (this.secs == 0){
                    this.secs = 59;
                    this.mins--;
                    
                } else {
                    this.secs--;
                }
            }            
        },

        toggleTimer: function() {
            this.isStopped = !this.isStopped;
        },

        goTimer: function() {
            this.isStarted = true;
            setInterval(function(){
                if (!app.isStopped) {
                    app.timer();
                }
            }, 1000);
        },

        submitData: function() {
            this.secs = parseInt(this.secs);
            this.mins = parseInt(this.mins);
            if (this.interval !== null) {
                this.interval = parseInt(this.interval);
            }else {
                this.interval = 0;
            }

            this.timerdata.seconds = this.secs;
            this.timerdata.minutes = this.mins;

            this.timerdata.interval = this.interval;
            this.submitted = true
        }
    }
})
