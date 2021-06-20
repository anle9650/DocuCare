const app = Vue.createApp({
    data() {
        return {
            showSchedule: true,
            blurForm: false,
            provider: '60a4814bc1b17d208033beb2',
            date: '05/18/2021',
            result: null,
            record: null,
            patientRecords: null
        }
    },
    created() {
        this.fetchRecords();
    },
    mounted() {
        const self = this;
        self.$nextTick(function() {
            $(".sidebar").mCustomScrollbar({
                theme: "minimal"
            });
        });
    },
    watch: {
        date() {
            this.fetchRecords();
        },
        record(newRecord) {
            fetch('/api/records?patient=' + newRecord.patient._id)
                .then(response => response.json())
                .then(json => this.patientRecords = json.data.records);
        }
    },
    computed: {
        arrived() {
            return this.result.data.records.filter(record => record.status === 'Waiting' || record.status === 'Ready');
        },
        incomplete() {
            return this.result.data.records.filter(record => !record.complete);
        }
    },
    methods: {
        fetchRecords() {
            fetch('/api/records?provider=' + this.provider + '&date=' + this.date)
                .then(response => response.json())
                .then(json => this.result = json)
        },
        setRecord(selectedRecord) {
            this.record = selectedRecord;
        }
    }
});

app.mount("#app");