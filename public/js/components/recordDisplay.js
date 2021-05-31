app.component('record-display', {
    props: {
        record: {
            type: String,
            required: true,
            default: null
        },
        completeDisplay: {
            type: Boolean,
            default: true
        }
    },
    template:
        /*html*/
        `<li>
            <popover-anchor :content="this.recordPreview">
                <div v-if="this.completeDisplay">
                    {{ this.recordObj.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} &#183; {{ this.recordObj.patient.name.first }} {{ this.recordObj.patient.name.last }}
                    <div class="problem">{{ this.recordObj.problem }}</div>
                    <span class="badge-pill badge-secondary" v-if="this.recordObj.status === 'Unarrived'">{{ this.recordObj.status }}</span>
                    <span class="badge-pill badge-secondary" v-else-if="this.recordObj.status === 'Checked out'">{{ this.recordObj.status }}</span>
                    <span class="badge-pill badge-warning" v-else-if="this.recordObj.status === 'Waiting'">{{ this.recordObj.status }}</span>
                    <span class="badge-pill badge-success" v-else-if="this.recordObj.status === 'Ready'">{{ this.recordObj.status }}</span>
                </div>
                <div v-else>
                    {{ this.recordObj.date.toLocaleDateString("en-US") }} &#183; {{ this.recordObj.problem }}
                </div>
            </popover-anchor>
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
        },
        recordPreview() {
            return "<b>History of Patient Illness</b><br/>" + this.recordObj.hpi + 
                    "<hr/><b>Review of Systems</b><br/>" + this.recordObj.ros + 
                    "<hr/><b>Physical Exam</b><br/>" + this.recordObj.exam + 
                    "<hr/><b>Assessment & Plan</b><br/>" + this.recordObj.assessment;
        }
    }
})