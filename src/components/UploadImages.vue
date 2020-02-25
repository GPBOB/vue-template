<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload" :default-file-list="defaultList" :show-upload-list="false" :on-success="handleSuccess"
            :format="['jpg','jpeg','png','.gif']" :max-size="10240"
            :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
            type="drag" :action="configs.base_url+'/biz-support-file/file/upload'"
            style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
      <img :src="bigImages" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import config from '@/config'

export default {
  name: '',
  data() {
    return {
      configs: config,
      imgName: '',
      visible: false,
      uploadList: [],
      bigImages: '',
      imgData: [],
      url: ''
    }
  },
  props: {
    defaultList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleView(url) {
      this.bigImages = url
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      // this.imgData.splice(this.uploadList.indexOf(file), 1);
      this.$emit('getImg', this.imgData)
    },
    handleSuccess(res, file, fileList) {
      fileList.map(item => {
        if (item.uid === file.uid) {
          item.url = this.url
        }
        return item
      })
      this.imgData = fileList
      // 处理上传成功的图片列表，data为需要的图片id，可根据情况修改下面的代码，同时父组件getImg也需要修改
      this.imgData.map(el => {
        if (el.response) {
          el.data = el.response.data
        }
        return el
      })
      this.$emit('getImg', this.imgData)
    },
    handleFormatError() {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '请选择图片文件格式，例如：.jpg,.png,.gif'
      });
    },
    handleMaxSize() {
      this.$Notice.warning({
        title: '超出图片大小',
        desc: '请上传10M一下的图片'
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: '最多上传5张图片'
        })
      }
      // base64预览图片
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const _base64 = reader.result
        this.url = _base64
      }
      return check;
    },
    clearImg() {
      this.$refs.upload.fileList.splice(0)
    },
  },
  mounted() {
    // 初始化组件内容
    if (this.$refs.upload && this.$refs.upload.fileList) {
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList
      })
    }
  },
  // 修改时，监听defaultList(默认图片列表)，修改imgData
  updated() {
    if (this.$refs.upload && this.$refs.upload.fileList) {
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList
        if (this.defaultList.length > 0) {
          this.imgData = this.uploadList
        }
      })
    }
  },

  components: {},
  computed: {},
}
</script>
<style lang='less' scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
