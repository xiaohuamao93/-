import { loadBC } from 'miniapp-bc-user'

Page({
  data: {
    goodlist: [],
    menuFixed: false,
    isShowToTop: false,
    isNotMore: false,
    isShowReceiveDialog: false,
    isShowRedPacketDialog: false,
    isShowGuide: false,
    loadMoreTime: 0,
    showComponent:false,
     pluginOptions: {
      relationId: '' // 如果插件有 pluginOptions
    }
  },
  onLoad() {
    this.params = {
      index: 0,
      size: 5
    }
    this.pageId = 1;
  },
  async onReady(){
    try {
      await loadBC();
      this.setData({ showComponent: true })
    } catch(e) {}
  },
  bcError(err){
    console.log('err:',err)
  },
  onPageScroll(evt) {
    let {scrollTop} = evt;
    const menuFixed = scrollTop >= 270;
    this.setData({
      menuFixed,
      isShowToTop: scrollTop > 1000
      });
  },
  onReachBottom() {
    this.setData({
      loadMoreTime: (this.data.loadMoreTime || 0) + 1 
    })
  },
  toTop() {
     my.pageScrollTo({
      scrollTop: 1,
      duration: 300
    });
  },
  closeGuidePopup() {
    this.setData({isShowGuide: false});
  },
  closeRedPacket() {
    this.setData({
      isShowRedPacketDialog: false
      });
  },
});
