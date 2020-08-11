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
            if (this.secs > 9) {
                if (this.mins > 9) {
                    return `${ this.mins }:${ this.secs }`;
                }
                return `0${ this.mins }:${ this.secs }`;
            }

            if (this.mins > 9) {
                return `${ this.mins }:0${ this.secs }`;
            }
            return `0${ this.mins }:0${ this.secs }`;
        },

    },

    template: `
        <style>
            .timer {
                font-size: 6em;
            }
        </style>
        <h1 class="text-center timer">{{ getTimer() }}</h1>
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
        isInterval: false,
        submitted: false,
        did_reset: false,
        submit_text: "Submit data",
        caption: false,
        is_timer: false,

        wantsAudio: true,

        timerdata: {
            minutes: null,
            seconds: null,
            interval: null
        },

        default: {
            minutes: 5,
            seconds: 0,
            interval: 15
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

        toggleCaption: function name(params) {
            this.caption = !this.caption;
        },

        goTimer: function() {
            if (!this.did_reset) {
                this.isStarted = true;
                setInterval(function(){
                    if (!app.isStopped && app.isStarted) {
                        app.timer();
                    }
                }, 1000);
            } else {
                this.isStarted = true
            }
        },

        submitData: function() {
            if (this.mins == null) {
                this.mins = this.default.minutes;
            } else {
                this.mins = parseInt(Math.abs(this.mins));
            }

            if (this.secs == null) {
                this.secs = this.default.seconds;
            } else {
                this.secs = parseInt(Math.abs(this.secs));
            }

            if (this.interval == null) {
                this.interval = this.default.interval;
            } else {
                this.interval = parseInt(Math.abs(this.interval));
            }
            // }

            this.timerdata.seconds = this.secs;
            this.timerdata.minutes = this.mins;

            this.timerdata.interval = this.interval;
            this.submitted = true;

            this.is_timer = true;
        },

        resetTimer: function() {
            this.secs = null;
            this.mins = null;
            this.interval = null;

            this.timerdata.seconds = null;
            this.timerdata.minutes = null;
            this.timerdata.interval = null;

            this.isStarted = false;
            this.isStopped = false;
            this.isInterval = false;

            this.submitted = false;

            this.did_reset = true;
            this.is_timer = false;
        }
    }
})
