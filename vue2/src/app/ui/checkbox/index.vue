<template>
<label :class="className">
    <span :class="prefix + '-input'">
        <input type="checkbox"
            :class="prefix + '-elem'"
            :name="name"
            :disabled="disabled"
            :true-value="trueValue"
            :false-value="falseValue"
            v-model="toggle"
            @change="doChange"
        >
        <span :class="prefix + '-icon'"></span>
    </span>

    <span class="u-checkbox-label" v-if="$slots.default">
        <slot></slot>
    </span>
</label>
</template>

<script>
export default {
    name: 'u-checkbox',

    data () {
        return {
            prefix: 'u-checkbox',
            myToggle: false
        }
    },

    props: {
        name: {
            type: String
        },

        disabled: {
            type: Boolean,
            default: false
        },

        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },

        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        
        indeterminate: {
            type: Boolean,
            default: false
        },

        value: {}
    },

    computed: {
        toggle: {
            get() {
                return this.value !== undefined ? this.value : this.myToggle
            },

            set(val) {
                this.$emit('input', val)
                this.myToggle = val
            }
        },

        className () {
            let checked

            if (typeof this.toggle === 'boolean') {
                checked = this.toggle
            }
            else {
                checked = this.toggle === this.trueValue
            }

            return {
                [`${this.prefix}`]: true,
                [`${this.prefix}-checked`]: checked,
                [`${this.prefix}-disabled`]: this.disabled,
                [`${this.prefix}-indeterminate`]: this.indeterminate
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
.u-checkbox {
    display: inline-block;
    font-size: 0;
    cursor: pointer;
    user-select: none;

    &.u-checkbox-checked {

    }

    &.u-checkbox-disabled {
        color: #bbb;
        cursor: not-allowed;
        .u-checkbox-icon {
            background: #eef1f6;
            border-color: #d1dbe5;
            cursor: not-allowed;
        }
        .u-checkbox-elem:checked + .u-checkbox-icon {
            background: #d1dbe5;
            border-color: #d1dbe5;
        }
    }

    &.u-checkbox-indeterminate {
        .u-checkbox-icon {
            &::before {
                display: none;
            }
            &::after {
                content: '';
                display: block;
                width: 12px;
                height: 2px;
                margin: 7px 2px;
                background: #fff;
            }
            background: #3e97eb;
            border-color: #3e97eb;
        }
    }

    .u-checkbox-input {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 22px;
        vertical-align: middle;
    }
    .u-checkbox-label {
        display: inline-block;
        margin-left: 4px;
        vertical-align: middle;
        font-size: 14px;
    }

    .u-checkbox-icon {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 18px;
        height: 18px;
        border: 1px solid #c0c0c0;
        border-radius: 4px;
        box-sizing: border-box;
        &::before {
            display: none;
            content: '';
            width: 4px;
            height: 10px;
            margin-left: 5px;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: rotate(45deg);
        }
    }

    .u-checkbox-elem {
        position: absolute;
        visibility: hidden;

        &:checked + .u-checkbox-icon {
            background: #3e97eb;
            border-color: #3e97eb;
            &::before {
                display: block;
            }
        }
    }
}
</style>
