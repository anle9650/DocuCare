const app = Vue.createApp({
    mounted() {
        this.fetchRecords();
        this.$nextTick(function() {
            $(".sidebar").mCustomScrollbar({
                theme: "minimal"
            });
        });
    },
    data() {
        return {
            showSchedule: true,
            blurForm: false,
            provider: '60a4814bc1b17d208033beb2',
            date: 'Tue%20May%2018%202021',
            keyword: '',
            result: null,
            record: null,
            patientRecords: null
        }
    },
    watch: {
        record(newRecord) {
            fetch('/api/records/patients/' + newRecord.patient._id)
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
            fetch('/api/records/dates/' + this.date)
                .then(response => response.json())
                .then(json => this.result = json)
        },
        setRecord(selectedRecord) {
            this.record = selectedRecord;
        },
        patchRecord(patchedData) {
            axios.patch('/api/records/' + this.record._id + '/update', patchedData)
                .then(() => this.fetchRecords());
        }
    }
});

app.mount("#app");