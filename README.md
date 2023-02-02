# neihu_traffic
[demo](https://ingridkao.github.io/neihu_traffic/)
內科交通問題研究專案


# Table of Contents
* [Project setup](#project-setup)
* [開發碰到的問題](#開發碰到的問題)


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
    > 用vue-analytics有相依性問題，vue3-analytics作者說不維護了建議用[vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/)
    > 舊版GA2023年7月確認棄用，需要改成GA4
    > vue-gtag已經出v2可以支援vue3，詳情可以看其官網
    > GA介面：管理 > 追蹤資訊 > 追蹤程式碼

    埋了一些event
    1. shareToFb
    2. copyURL
    3. updateLowSpeed
    4. carousel click
    5. columnchart click
    ```
        this.$gtag.event('update_column_chart', {
            event_category: 'neihu_traffic_action'
        }) 
    ```



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



7. 使用`WebM`檔案
    1.  [支援度](https://caniuse.com/webm)
    2. 但考慮到瀏覽器的支援程度並不高，尤其safari、Opera完全沒有救，因此還是先以mp4為主，在source中設定也會有error產生
        ```
        sources: [
            {
                type: "video/mp4",
                src:VideoMp4
            },
            {
                type: "video/webm",
                src:VideoWebm
            }
        ]
        ```
        因此先放棄此種方式
    3. [線上轉檔](https://cloudconvert.com/webm-to-mp4)


8. safari出現error: Unhandled Promise Rejection: AbortError: The operation was aborted.
    > 這個問題應該是因為video.js衍伸的問題，2018年就開始出現且只有在safari才會出現，safari真的是繼IE之後最討人厭的瀏覽器，偏偏因為是apple預設不管是電腦還是手機都很多人使用。
    [參考解法](https://github.com/videojs/videojs-contrib-quality-levels/issues/32)
    ```
        videojs.options.hls.overrideNative = true;
        videojs.options.html5.nativeAudioTracks = false;
        videojs.options.html5.nativeVideoTracks = false;
    ```
    可參考`/src/components/header/VideoPlayer.vue`L18-20，不過加完後還是會偶發性出現那段error

9. 正規表示法在safari中會產生意外的錯誤: Invalid regular expression: invalid group specifier name
    > 總之就是Regular format is wrong，safari看不懂沒宣告過的方式
    
    原本參考各個寫法顯示千分位數值的方式
    `/\B(?=(\d{3})+(?!\d))/g `是全部匹配一个位置，這個位置前面要有字元存在，然後後面是3的倍數個數字，再後面是非數字。
    ```
    num = 1279834847944074100465236.33;
    comma = /(d{1,3})(?=(d{3})+(?:$|D))/g ;
    n1 = num.toString().replace(comma,",")
    ```

    1. 需要使用new RegExp('...', 'g') 包起來
    2. 有使用到 \d 的部份要改用兩個反斜線來取代，例如 \d 需更改為 \\d
    ```
        const priceFormat = (val) => {
            const regExp = new RegExp('\\B(?=(\\d{3})+(?!\\d))', 'g');
            return val.toString().replace(regExp, ',');
        }
    ```

tags: `Vue` `apexcharts` `mapbox`