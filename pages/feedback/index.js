// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: '体验问题',
                isActive: true
            },
            {
                id: 1,
                value: '商品、商家投诉',
                isActive: false
            }
        ],
        chooseImg: []
    },

    handletabItemChange(e) {
        const { index } = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                const allImg = [...this.data.chooseImg, ...result.tempFilePaths]
                this.setData({ chooseImg: allImg })
            },
        })

    },
    handleremoveImg(e) {
        const { index } = e.currentTarget.dataset
        let { chooseImg } = this.data
        chooseImg.splice(index, 1)
        this.setData({ chooseImg })
    }
})