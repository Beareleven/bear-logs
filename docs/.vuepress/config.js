module.exports = {
    title: 'Bear-s-Blos',
    description: 'Bear技术路上的一些笔记',
    base: '/bear-logs/',
    // theme: 'reco',
    locales: {
        '/': {
          lang: 'zh-CN'
        }
    },
    themeConfig: {
        subSidebar: 'auto',
        lastUpdated: '上次更新',
        // 评论组件
        // valine配置
        // valineConfig: {
        //     appId: 'YM0u8fn03o6Qp1oP3Ufum7yz-gzGzoHsz',
        //     appKey: 'adGIBKcrfOeJqveCvxLabXKS',
        // },
        // vssue配置
        // vssueConfig: {
        //     platform: 'github',
        //     owner: 'beareleven',
        //     repo: 'Bear-s-Blog',
        //     clientId: 'dee5deff40ba71a33cdc',
        //     clientSecret: '8a0bf51aa93cb9d7d0f81515e6513a4f1ddd602d',
        // },
        nav: [
            {text: '首页',link: '/'},
            {
                text: 'Bear的 日常',
                items: [
                    {text: 'WeChat', link: '/'},
                    {text: '掘金', link: '/1'}
                ]
            }
        ],
        sidebar: [
            {
                title: 'welcome to Bear\'s Blog',
                path: '/',
                collapsed: false, // 不折叠
                children: [
                    {title: 'Read Before', path: '/'}
                ]
            },
            {
                title: '浏览器原理',
                path: '/handbook/Brower/浏览器安全',
                collapsed: false, // 不折叠
                children: [
                    {title: '浏览器安全',path: '/handbook/Brower/浏览器安全'},
                    {title: '浏览器本地存储',path: '/handbook/Brower/浏览器本地存储'},
                    {title: '浏览器缓存',path: '/handbook/Brower/浏览器缓存'},
                    {title: '浏览器事件机制',path: '/handbook/Brower/浏览器事件机制'},
                    {title: '浏览器同源策略',path: '/handbook/Brower/浏览器同源策略'},
                ]
            },
            {
                title: '计算机网络',
                path: '/handbook/Network/HTTP_HTTPS',
                collapsed: true,
                children: [
                    {title: 'HTTP/HTTPS',path: '/handbook/Network/HTTP_HTTPS'},
                    {title: 'TCP/UDP',path: '/handbook/Network/TCP_UDP'},
                    {title: 'DNS',path: '/handbook/Network/DNS'}
                ]
            },
            {
                title: 'LeetCode每日算法',
                path: '/handbook/DayDayUp/isREADME',
                collapsed: true,
                children: [
                    {title: 'README', path: '/handbook/DayDayUp/isREADME'},
                    {title: '812.最大三角形面积',path: '/handbook/DayDayUp/[812]最大三角形面积'},
                    {title: '691.贴纸拼词',path: '/handbook/DayDayUp/[691]贴纸拼词'},
                    {title: '面试题 01.05.一次编辑',path: '/handbook/DayDayUp/[面试题 01.05]一次编辑'},
                    {title: '944.删列造序',path: '/handbook/DayDayUp/[944]删列造序'},
                    {title: '449.序列化和反序列化二叉搜索树', path: '/handbook/DayDayUp/[449]序列化和反序列化二叉搜索树'},
                    {title: '1728.猫和老鼠2',path: '/handbook/DayDayUp/[1728]猫和老鼠2'},
                    {title: '942.增减字符串匹配',path: '/handbook/DayDayUp/[942]增减字符串匹配'},
                    {title: '442.数组中重复的数据',path: '/handbook/DayDayUp/[442]数组中重复的数据'},
                    {title: '433.最小基因变化',path: '/handbook/DayDayUp/[433]最小基因变化'},
                    {title: '933.最近的请求次数',path: '/handbook/DayDayUp/[933]最近的请求次数'},
                    {title: '713.乘积小于K的子数组',path: '/handbook/DayDayUp/[713]乘积小于K的子数组'},
                    {title: '1823.找出游戏的获胜者',path: '/handbook/DayDayUp/[1823]找出游戏的获胜者'},
                    {title: '937.重新排列日志文件', path: '/handbook/DayDayUp/[937]重新排列日志文件'},
                    {title: '591.标签验证器',path: '/handbook/DayDayUp/[591]标签验证器'},
                    {title: '1305.两颗二叉搜索树中的所有元素', path: '/handbook/DayDayUp/[1305]两棵二叉搜索树中的所有元素'},
                    {title: '908.最小差值',path: '/handbook/DayDayUp/[908]最小差值'},
                    {title: '427.建立四叉树',path: '/handbook/DayDayUp/[427]建立四叉树'},
                    {title: '905.按奇偶排序数组',path: '/handbook/DayDayUp/[905]按奇偶排序数组'},
                    {title: '417.太平洋大西洋水流问题',path: '/handbook/DayDayUp/[417]太平洋大西洋水流问题'},
                    {title: '883.三维形体投影面积',path: '/handbook/DayDayUp/[883]三维形体投影面积'},
                    {title: '398.随机数索引',path: '/handbook/DayDayUp/[398]随机数索引'},
                    {title: '868.二进制间距',path: '/handbook/DayDayUp/[868]二进制间距'},
                    {title: '396.旋转函数', path: '/handbook/DayDayUp/[396]旋转函数'},
                    {title: '824.山羊拉丁文',path: '/handbook/DayDayUp/[824]山羊拉丁文'},
                ]
            },
            {
                title: 'Practice',
                path: '/handbook/SomePractice/HtmlToAst',
                collapsed: true,
                children: [
                    {title: 'HtmlToAst', path: '/handbook/SomePractice/HtmlToAst'},
                    // {title: 'RichText', path: '/handbook/SomePractice/RichText'}
                ]
            }
        ],
    }
}