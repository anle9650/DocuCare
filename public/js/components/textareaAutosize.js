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
        modelValue: {
            type: String,
            default: null
        }
    },
    emits: {
        'update:modelValue': null
    },
    template:
        /*html*/
        `<div class="grow-wrap" :data-replicated-value="value">
            <textarea class="form-control" :id="this.id" :name="this.name" v-model="value"></textarea>
        </div>`,
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
})