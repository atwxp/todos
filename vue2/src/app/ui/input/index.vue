<template>
<div :class="wrapClassName">
    <div :class="[prefix + '-prepend']" v-if="$slots.prepend">
        <slot name="prepend"></slot>
    </div>

    <input ref="input" v-focus="autofocus"
        :class="[prefix + '-elem']"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @keyup.enter="doEnter"
        @blur="doBlur"
        @input="doInput"
    >

    <div :class="[prefix + '-append']" v-if="$slots.append">
        <slot name="append"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'u-input',

    data () {
        return {
            prefix: 'u-input',
            prepend: false,
            append: false
        }
    },

    props: {
        type: {
            default: 'text',
            validator(val) {
                return ['text', 'password'].includes(val)
            }
        },

        size: {
            type: String,
            validator(val) {
                return [val, 'large', 'small'].includes(val)
            }
        },

        placeholder: {
            type: String,
            default: ''
        },

        value: {
            default: ''
        },

        disabled: {
            type: Boolean,
            default: false
        },

        autofocus: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        wrapClassName() {
            return [
                this.prefix,
                {
                    [`${this.prefix}-group`]: this.$slots.prepend || this.$slots.append,
                    [`${this.prefix}-${this.type}`]: !!this.type,
                    [`${this.prefix}-${this.size}`]: !!this.size
                }
            ]
        }
    },

    methods: {
        doEnter(event) {
            this.$emit('enter', event)
        },

        doBlur(event) {
            this.$emit('blur', event)
        },

        // http://blog.csdn.net/yangbingbinga/article/details/61914312
        doInput(event) {
            this.$emit('input', event.target.value)
        }
    },

    directives: {
        focus: {
            updated(el, binding) {
                binding.value && el.focus()
            }
        }
    }
}
</script>

<style lang="less">
.u-input {
    font-size: 0;
    width: 100%;

    &.u-input-group {
        .u-input-elem {
           border-radius: 0;
        }
        .u-input-prepend {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
        }
        .u-input-append {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none;
        }
    }
    .u-input-prepend, .u-input-append {
        display: inline-block;
        padding: 3px 6px;
        height: 32px;

        background: #eee;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid #ccc;

        line-height: 26px;
        vertical-align: middle;
        font-size: 12px;
    }
    .u-input-prepend {

    }
    .u-input-append {

    }
    &.u-input-large {
        .u-input-elem {
            height: 40px;
            font-size: 16px;
        }
    }

    &.u-input-small {
        .u-input-elem {
            height: 24px;
            font-size: 12px;
        }
    }
    .u-input-elem {
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 10px;
        border: 1px solid #ccc;

        box-sizing: border-box;
        background: #fff;
        border-radius: 3px;

        font-size: 14px;
        line-height: 1.5;

        outline: none;
        vertical-align: middle;
        -webkit-appearance: none;

        transition: border .2s ease-in-out, box-shadow .2s ease-in-out;

        &:focus {
            border-color: #48a1f5;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(106, 170, 230, 0.73);
        }

        &[disabled] {
            background: #f5f5f5;
            cursor: not-allowed;
        }
    }
}
</style>
