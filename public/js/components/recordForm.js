app.component('record-form', {
    props: {
        record: {
            type: String,
            required: true,
            default: null
        }
    },
    template: 
        /*html*/
        `<div class="page-header">
            <h1>{{ this.recordObj.patient.name.first }} {{ this.recordObj.patient.name.last }} &#183; {{ this.recordObj.date.toLocaleDateString("en-US") }}</h1>
            <div class="text-muted">{{ this.recordObj.patient.gender }} &#183; Date of birth: {{ this.recordObj.patient.DOB.toLocaleDateString("en-US") }}</div>
        </div>
        <form>
            <div class="form-group"> 
                <label for="hpi">History of Patient Illness</label>
                <textarea-autosize id="hpi" name="hpi" :value="this.recordObj.hpi" :key="this.recordObj._id" @value-change="updateHpi"></textarea-autosize>
            </div>
            <div class="form-group">
                <label for="ros">Review of Systems</label>
                <textarea-autosize id="ros" name="ros" :value="this.recordObj.ros" :key="this.recordObj._id" @value-change="updateRos"></textarea-autosize>
            </div>
            <div class="form-group">
                <label for="exam">Physical Exam</label>
                <textarea-autosize id="exam" name="exam" :value="this.recordObj.exam" :key="this.recordObj._id" @value-change="updateExam"></textarea-autosize>
            </div>
            <div class="form-group">
                <label for="assessment">Assessment & Plan</label>
                <textarea-autosize id="assessment" name="assessment" :value="this.recordObj.assessment" :key="this.recordObj._id" @value-change="updateAssessment"></textarea-autosize>
            </div>
            
            <button type="button" class="btn btn-primary" @click="toggleComplete">{{ complete ? 'Re-open chart' : 'Close chart' }}</button>
        </form>`,
    data() {
        return {
            complete: null
        }
    },
    watch: {
        record(newRecord) {
            this.complete = JSON.parse(newRecord).complete;
        }
    },
    computed: {
        recordObj() {
            if (this.record != null) {
                let record = JSON.parse(this.record);
                record.date = new Date(record.date);
                record.patient.DOB = new Date(record.patient.DOB);
                return record;
            }
            else
                return null;
        }
    },
    methods: {
        updateHpi(updatedValue) {
            this.$emit('record-change', { "hpi": updatedValue });
        },
        updateRos(updatedValue) {
            this.$emit('record-change', { "ros": updatedValue });
        },
        updateExam(updatedValue) {
            this.$emit('record-change', { "exam": updatedValue });
        },
        updateAssessment(updatedValue) {
            this.$emit('record-change', { "assessment": updatedValue });
        },
        toggleComplete() {
            this.complete = !this.complete;
            this.$emit('record-change', { "complete": this.complete });
        }
    }
})