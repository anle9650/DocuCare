const app = Vue.createApp({
    data() {
        return {
            showSchedule: true,
            blurForm: false,
            provider: '60ae74a467f70000156bdc12',
            date: '05/18/2021',
            records: null,
            arrived: null,
            incomplete: null,
            record: null,
            patientRecords: null
        }
    },
    created() {
        this.fetchRecords();
    },
    mounted() {
        this.$nextTick(function() {
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
    methods: {
        fetchRecords() {
            fetch('/api/records?provider=' + this.provider + '&date=' + this.date)
                .then(response => response.json())
                .then(json => {
                    this.records = json.data.records;
                    this.arrived = this.records.filter(record => record.status === 'Waiting' || record.status === 'Ready');
                    this.incomplete = this.records.filter(record => !record.complete);
                });
        },
        setRecord(selectedRecord) {
            this.record = selectedRecord;
        }
    }
});

app.mount("#app");