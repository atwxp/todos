<template>
<button :class="className"
    :disabled="disabled"
    :name="name"
    :type="kind"
    @click="doClick"
>
    <slot></slot>
</button>
</template>

<script>
// https://github.com/atwxp/900months/blob/master/src/ui/button/index.vue
export default {
    name: 'u-button',

    props: {
        name: {
            type: String,
            default: ''
        },

        kind: {
            type: String,
            default: 'button',
            validator (t) {
                return ['submit', 'button', 'menu', 'reset'].includes(t)
            }
        },

        clickHandler: {
            type: Function,
            default: function () {}
        },

        type: {
            type: String,
            validator (t) {
                return ['primary', 'danger'].includes(t)
            }
        },

        size: {
            type: String,
            validator (t) {
                return ['large', 'small'].includes(t)
            }
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        className() {
            return [
                'u-button',
                {
                    [`u-button-${this.type}`]: !!this.type,
                    [`u-button-${this.size}`]: !!this.size
                }
            ]
        }
    },
    methods: {
        doClick() {
            this.$emit('clickHandler')
        }
    }
}
</script>

<style lang="less">
.u-button {
    display: inline-block;
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #ccc;

    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;

    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    cursor: pointer;

    user-select: none;
    outline: none;
    -webkit-appearance: none;

    &:active, &:hover {
        background-color: #eee;
    }
    &[disabled] {
        cursor: not-allowed;
        opacity: .65;
        &:active, &:hover {
            background-color: #fff;
        }
    }
    &.u-button-primary {
        background-color: #48a1f5;
        border-color: #52a6f5;
        color: #fff;
        &:active, &:hover {
            background-color: #52a6f5;
            border-color: #48a1f5;
        }
        &[disabled] {
            &:active, &:hover {
                background-color: #52a6f5;
                border-color: #52a6f5;
            }
        }
    }
    &.u-button-danger {
        background-color: #f73c2e;
        border-color: #f04134;
        color: #fff;
        &:active, &:hover {
            background-color: #d82c1f;
            border-color: #e04034;
        }
        &[disabled] {
            &:active, &:hover {
                background-color: #f04134;
                border-color: #f04134;
            }
        }
    }

    &.u-button-large {
        padding: 8px 16px;
    }

    &.u-button-small {
        padding: 4px 8px;
        font-size: 12px;
        line-height: 1.2;
    }
}
</style>
