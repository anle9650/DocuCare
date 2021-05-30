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
    emits: {
        input: null
    },
    template:
        /*html*/
        `<div class="grow-wrap" :data-replicated-value="replicatedValue">
            <textarea class="form-control" :id="this.id" :name="this.name" v-model="replicatedValue" @input="$emit('input', this.replicatedValue)"></textarea>
        </div>`,
    data() {
        return {
            replicatedValue: this.value
        }
    },
    watch: {
        key() {
            this.replicatedValue = this.value;
        }
    }
})