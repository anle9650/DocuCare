app.component('record-display', {
    props: {
        record: {
            type: String,
            required: true,
            default: null
        }
    },
    emits: {
        selectRecord: null
    },
    template:
        /*html*/
        `<li>
            <a href="#" @click="selectRecord">{{ this.recordObj.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} &#183; {{ this.recordObj.patient.name.first }} {{ this.recordObj.patient.name.last }}
                <div class="problem">{{ this.recordObj.problem }}</div>
                <span class="badge-pill badge-secondary" v-if="this.recordObj.status === 'Unarrived'">{{ this.recordObj.status }}</span>
                <span class="badge-pill badge-secondary" v-else-if="this.recordObj.status === 'Checked out'">{{ this.recordObj.status }}</span>
                <span class="badge-pill badge-warning" v-else-if="this.recordObj.status === 'Waiting'">{{ this.recordObj.status }}</span>
                <span class="badge-pill badge-success" v-else-if="this.recordObj.status === 'Ready'">{{ this.recordObj.status }}</span>
            </a>
        </li>`,
    computed: {
        recordObj() {
            if (this.record) {
                let record = JSON.parse(this.record);
                record.date = new Date(record.date);
                return record;
            }
            else
                return null;
        }
    },
    methods: {
        selectRecord() {
            this.$emit('selectRecord', this.recordObj);
        }
    }
})