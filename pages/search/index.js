import { request } from '../../request/index.js'
import regeneratorRuntime from "../../lib/regenerator/runtime";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        iptValue: ''
    },
    Timeid: -1,
    handleInput(e) {
        const { value } = e.detail
        if (!value.trim()) {
            clearTimeout(this.Timeid)
            this.setData({
                goods: [],
                isFocus: false
            })
            return
        }
        this.setData({ isFocus: true })
        clearTimeout(this.Timeid)
        this.Timeid = setTimeout(() => {
            this.getItem(value)

        }, 1000)
    },
    async getItem(query) {
        const res = await request({ url: "/goods/qsearch", data: { query } })
        this.setData({
            goods: res.message
        })
    },
    handleCancel() {
        this.setData({
            goods: [],
            isFocus: false,
            iptValue: ''
        })
    }
})