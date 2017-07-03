<template>
<label :class="className">
    <span :class="prefix + '-input'">
        <input type="radio"
            v-model="selected"
            :class="prefix + '-elem'"
            :name="name"
            :value="trueValue"
            :disabled="disabled"
            @change="doChange"
        >
        <span :class="prefix + '-icon'"></span>
    </span>

    <span class="u-radio-label" v-if="$slots.default">
        <slot></slot>
    </span>
</label>
</template>

<script>
export default {
    name: 'u-radio',

    data () {
        return {
            prefix: 'u-radio'
        }
    },

    props: {
        name: {
            type: String,
            required: true
        },

        disabled: {
            type: Boolean,
            default: false
        },

        trueValue: {},

        value: {}
    },

    computed: {
        selected: {
            get() {
                return this.value
            },

            set(val) {
                this.$emit('input', val)
            }
        },

        className () {
            return {
                [`${this.prefix}`]: true,
                [`${this.prefix}-disabled`]: this.disabled,
                [`${this.prefix}-selected`]: this.value === this.trueValue
            }
        }
    },

    methods: {
        doChange(event) {
            this.$emit('change', event)
        }
    }
}
</script>

<style lang="less">
.u-radio {
    display: inline-block;
    font-size: 0;
    cursor: pointer;
    user-select: none;

    &.u-radio-disabled {
        cursor: not-allowed;
        color: #ccc;

        .u-radio-icon {
            background: rgba(236, 236, 236, 0.49);
            border-color: #dcdcdc;
        }
        .u-radio-elem {
            &:checked + .u-radio-icon {
                border-color: #dcdcdc;
                &::before {
                    background: #d2d2d2;
                }
            }
        }
    }

    &.u-radio-selected {
        
    }

    .u-radio-label {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
    }

    .u-radio-input {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 4px;
        vertical-align: middle;
    }

    .u-radio-icon {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 18px;
        height: 18px;
        border: 1px solid #c0c0c0;
        border-radius: 50%;
        box-sizing: border-box;
        &::before {
            display: none;
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 3px 0 0 3px;
        }
    }

    .u-radio-elem {
        position: absolute;
        visibility: hidden;

        &:checked + .u-radio-icon {
            border-color: #52a6f5;
            &::before {
                display: block;
                background: #48a1f5;
            }
        }
    }
}
</style>
