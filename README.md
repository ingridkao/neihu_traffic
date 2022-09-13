# neihu_traffic
[demo](https://ingridkao.github.io/neihu_traffic/)


## Project setup
使用vue-cli，在這邊使用Vue 3

1.  installs a package
    ```
    npm install
    ```

2. Compiles and hot-reloads for development
    ```
    npm run serve
    ```

3. Compiles and minifies for production
    1. Edit .env.production
    `vi .env.production`
        ```
        VUE_APP_MAPBOXTOKEN = <your access token here>
        VUE_APP_BASE_URL = <"/publicPath">
        ```
    2. Compiles
        ```
        npm run build
        ```

## 開發碰到的問題
1. 在手機上會一直閃退
    > 最後確定的原因是因為地圖所使用上的點位檔案太過龐大，有兩種解法：
        1.  透過後端寫一個api去filter geojson大小，目前僅靜態網頁
        2. 將點位上傳到[Mapbox tilesets server](https://studio.mapbox.com/tilesets)
        但兩者現階段接皆無法解決，因此手機版先不呈現地圖只截GIF圖。


2. GA in vue 3
    > 用vue-analytics有相依性問題，vue3-analytics作者說不維護了建議用[vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/)，但用了之後還是覺得怪怪的，直接用GA介面上的程式碼GTAG.JS貼在index.html。
    > GA介面：管理 > 追蹤資訊 > 追蹤程式碼



3. i18n
    > 使用支援vue3的`vue-i18n@9`，和@nuxtjs/i18n差不多
    1. 切換語系時寫法比較簡單
    2. 重新整理，[參考](https://ithelp.ithome.com.tw/articles/10262689?sc=iThelpR)



4. 使用`setProperty`做scroll-animation
    > 最近才知道滾動動畫可以用這個方法做[參考](https://css-tricks.com/books/greatest-css-tricks/scroll-animation/)。
    ```
    window.addEventListener('scroll', () => {
        document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    }, false);
    ```

    用v-bind的方式來寫進#homePage並接聽watch scroll事件
    1. Vue掛載完成增加滾輪事件監聽
        ```
        mounted() {
            window.addEventListener("scroll", this.handleScroll)
        }
        ```
    2. 定義事件：視窗滾到哪/(#homePage高度 - 視窗高度)
        ```
        methods: {
            handleScroll(){
                this.scrollValue = window.pageYOffset / (this.$refs.home_container.clientHeight - window.innerHeight)
            },
            ...
        }
        ```
    3. 透過computed綁定(不喜歡html裡面亂亂的)
        ```
        computed: {
            scrollBind() {
                return {
                    '--scroll': this.scrollValue
                }
            },
            ...
        }
        ```



5. 使用`aos`來做簡易動畫
    [官方文件](https://michalsnik.github.io/aos/)
    1. 下載
        ```
        npm i aos@next
        ```
    2. 引入
        ```
        <script>
            import AOS from "aos";
            import "aos/dist/aos.css";
            ...
        ```
    3. 初始化
        ```
        created() {
            AOS.init({})
        }
        ```
    4. 依照官方文件中的規範補html tag的attribute



6. 使用`apexcharts`來做圖表
    > 之前使用過echart, hightchart, chartjs，apexcharts是目前用過引入方式最友善的
    [官方文件](https://apexcharts.com/docs/vue-charts/)
    1. 下載
        ```
        npm install --save apexcharts vue3-apexcharts
        ```
    2. 用法可以參考[實作](https://github.com/ingridkao/neihu_traffic/blob/main/src/components/charts/ColumnBasic.vue)