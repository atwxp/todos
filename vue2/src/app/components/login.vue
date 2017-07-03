<template>
<section class="login">
    <u-input type="text" placeholder="账号" v-model="user.account"></u-input>

    <u-input type="password" placeholder="密码" v-model="user.password" v-on:enter="doLogin"></u-input>

    <u-button type="primary" v-on:clickHandler="doLogin">登录</u-button>
</section>
</template>

<script>
import uInput from '../ui/input'
import uButton from '../ui/button'

export default {
    name: 'login',

    data () {
        return {
            user: {
                account: 'abcd',
                password: 'admin'
            }
        }
    },

    components: {
        uInput,
        uButton
    },

    methods: {
        doLogin() {
            this.$store.dispatch('doLogin', this.user)
                .then(() => {
                    this.$router.push('todos')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="less">
.login {
    .u-input {
        margin-bottom: 10px;
    }
    .u-button {
        width: 100%;
    }
}
</style>
