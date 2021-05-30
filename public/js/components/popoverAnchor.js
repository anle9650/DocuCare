app.component('popover-anchor', {
    props: {
        trigger: {
            type: String,
            default: 'hover'
        },
        content: {
            type: String,
            default: null
        }
    },
    template:
        /*html*/
        ` <a href="#" data-toggle="popover" :data-content="this.content">
            <slot></slot>
        </a>`,
    mounted() {
        this.$nextTick(function() {
            $('[data-toggle="popover"]').popover({
                container: 'body',
                trigger: this.trigger,
                html: true
            });
        });
    }
})