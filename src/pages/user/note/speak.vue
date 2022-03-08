<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>留言管理</el-breadcrumb-item>
            <el-breadcrumb-item>留言事项声明</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="dataList">
                <el-table-column prop="prop" label="用户须承诺" width="width">
                </el-table-column>
            </el-table>
        </el-card>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataList: [{
                        prop: "在网页上发布信息或者利用本站的服务时必须符合国家有关法律法规,不得在本站的网页上或者利用本站的服务制作、复制、发布、传播以下信息:"
                    },
                    {
                        prop: "(a)反对宪法所确定的基本原则的;"
                    },
                    {
                        prop: '(b)危害国家安全，泄露国家秘密，颠爱国家政权，破坏国家统一的;'
                    }, {
                        prop: '(C)损害国家荣誉和利益的;'
                    }, {
                        prop: '(d)煽动民族仇恨、民族歧视，破坏民族团结的;'
                    }, {
                        prop: '(e)破坏国家宗教政策,宣扬邪教和封建迷信的;'
                    },
                    {
                        prop: '(f)散布谣言,扰乱社会秩序，破坏社会稳定的;'
                    }, {
                        prop: '(g)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;'
                    }, {
                        prop: '(h)侮辱或者诽谤他人,侵害他人合法权益的;'
                    }, {
                        prop: '(i) 含有法律、行政法规禁止的其他内容的。'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
.el-card {
	margin-top: 30px;
}
</style>