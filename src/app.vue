<template>
    <div id="App">
        啦啦啦啦啦啦
        <!--<img src="../public/1.jpg" alt="">-->
        <!--<img src="./assets/2.jpg" alt="">-->
        <demo></demo>
    </div>
</template>

<script>
    import demo from './components/demo'
    export default {
        name: "app",
        components: {
            demo
        }
        // mounted () {
        //     alert('111');
        // }
    }
</script>

<style>
    #App {
        background: red;
    }
</style>
