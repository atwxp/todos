<template>
<div class="app">
    <header>
        <h1 class="title">Todos</h1>
    </header>

    <section class="main">
        <router-view></router-view>
    </section>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less">
html, body,
ul, ol,
h1, h2, h3,
p, input {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

input, button {
    outline: none;
    -webkit-appearance: none;
}

html, body {
    min-height: 100%;
}
body {
    font: 14px/1.5 'Avenir', Helvetica, Arial, sans-serif;
    background-color: #fff;
    color: #333;
}
.app {
    min-width: 320px;
    margin: 50px auto 0;
}

.title {
    margin-bottom: 15px;
    text-align: center;
}
.main {
    width: 60%;
    margin: auto;
}
</style>
