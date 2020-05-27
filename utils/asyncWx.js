const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })  
    })
}
const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail:(err) => {
                reject(err)
            }
        }) 
    })
}
const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fali:(err)=>{
                reject(err)
            }
        })
    })
}
const showModal = ({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
               resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })  
    })
}
const showToast = ({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: title,
            icon:"none",
            success: (result) => {
               resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })  
    })
}
const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
          });
    })
}
export {
    getSetting,
    openSetting,
    chooseAddress,
    showModal,
    showToast,
    login
}