<template>
   <div>
       <Header @toParent="getMag" @toSetlang="setLang"/>
        <div class="user margin">
            <div class="container verifyMail box">
                <h1>恭喜您验证成功，您可以去登录了</h1>
                
            </div>
        </div>
   </div>
</template>
<script>
export default {
    name:"user",
    middleware: 'userAuth',
    created() {
        this.postcode()
    },
    computed: {
        // 计算属性
    },
    components: {
        // 组件的引用
        // VeLine,
    },
    methods: {
        getMag(msg){
            
        },
        setLang(msg){

        },
        postcode(){

            this.$axios.$get('account/active/?params='+this.$route.query.params).then((result) => {
              // 如果正确的返回了token，则将token写入cookie
              console.log(result)
            })
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width:1280px;
        margin: 0 auto;
        padding: 40px 30px;
        min-height: 800px;
    }
    .verifyMail{
        text-align: center;

    }
</style>