app.component('textarea-autosize', {
    props: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        }
    },
    template:
        /*html*/
        `<div class="grow-wrap" :data-replicated-value="replicatedValue">
            <textarea class="form-control" :id="this.id" :name="this.name" v-model="replicatedValue" @input="valueChange"></textarea>
        </div>`,
    data() {
        return {
            replicatedValue: this.value
        }
    },
    watch: {
        value(newInput) {
            this.replicatedValue = newInput;
        },
        key() {
            this.replicatedValue = this.value;
        }
    },
    methods: {
        valueChange() {
            this.$emit('value-change', this.replicatedValue);
        }
    }
})