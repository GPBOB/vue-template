<template>
  <taskContainer title="打卡统计" btn-title="范围设置" @taskBtnMethod="openSet">
    <Row>
      <Form :label-width="80">
        <Col span="4">
          <FormItem label="日期范围">
            <DatePicker
              type="daterange"
              format="yyyy-MM-dd"
              @on-change="getDate"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="是否发热">
            <Select v-model="searchData.isHot">
              <Option value>全部</Option>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="是否打卡">
            <Select v-model="searchData.isClock">
              <Option value>全部</Option>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Input v-model="searchData.phoneOrName" placeholder="电话/姓名" />
          </FormItem>
        </Col>
        <Col span="2" offset="1">
          <Button @click="getCardList">搜索</Button>
        </Col>
        <Col span="1" style="margin-left:10px">
          <Button @click="exportCard" :disabled="isExport">{{
            isExport ? '导出中...' : '导出'
          }}</Button>
        </Col>
      </Form>
    </Row>
    <Table :columns="tableCol" :data="tableData"></Table>
    <Page
      class="task_page"
      :total="total"
      :current="searchData.current"
      :page-size="searchData.size"
      size="small"
      show-elevator
      show-sizer
      show-total
      @on-change="handlePage"
      @on-page-size-change="handlePageSize"
    />
    <Modal title="范围设置" v-model="isModal" @on-ok="setRecord">
      <Form>
        <FormItem label="打卡原点">
          <Input
            v-model="addressName"
            @input="onInputSearch"
            placeholder="搜索位置"
          />
          <baidu-map
            :center="actionMapCenter"
            :zoom="actionMapZoom"
            scroll-wheel-zoom
            @ready="actionHandler"
            @click="handleClickForSearch"
          >
            <bm-view class="map"></bm-view>
            <bm-marker
              :position="actionMapCenter"
              animation="BMAP_ANIMATION_BOUNCE"
            ></bm-marker>
            <bm-local-search
              :panel="openMapSearch"
              :keyword="mapSearchKeyword"
              :auto-viewport="true"
              @infohtmlset="onSearchResultSelect"
            ></bm-local-search>
          </baidu-map>
        </FormItem>
        <FormItem label="范围大小(必填)">
          <Input v-model="distance" placeholder="单位：KM" />
        </FormItem>
      </Form>
    </Modal>
  </taskContainer>
</template>

<script>
import taskContainer from '@/components/taskComponents/TaskContainer';
const companyApi = require(`@/api/company`).default;
export default {
  name: 'AppMain',
  data() {
    return {
      tableCol: [
        {
          title: '序号',
          type: 'index',
          width: '70'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '签到图片',
          render: (h, params) => {
            let staticsName = params.row.isClock == 1 ? '已打卡' : '未打卡';
            return h(
              'img',
              {
                attrs: {
                  src: params.row.fileUrl
                },
                style: {
                  width: '50px',
                  height: '50px',
                  padding: '5px 0px'
                }
              },
              staticsName
            );
          }
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '打卡时间',
          key: 'date'
        },
        {
          title: '体温',
          key: 'temperature'
        },
        {
          title: '是否打卡',
          render: (h, params) => {
            let staticsName = params.row.isClock == 1 ? '已打卡' : '未打卡';
            return h('span', {}, staticsName);
          }
        },
        {
          title: '上班状态',
          render: (h, params) => {
            let staticsName =
              params.row.recordStatus == 0
                ? '在岗'
                : params.row.recordStatus == 1
                ? '外勤'
                : '请假';
            return h('span', {}, staticsName);
          }
        },
        {
          title: '打卡状态',
          render: (h, params) => {
            let staticsName = params.row.status == 1 ? '正常' : '异常';
            return h('span', {}, staticsName);
          }
        },
        {
          title: '是否发热',
          render: (h, params) => {
            let staticsName = params.row.isHot == 1 ? '发热' : '正常';
            return h('span', {}, staticsName);
          }
        },
        {
          title: '地址',
          key: 'address',
          tooltip: true
        }
      ],
      tableData: [],
      searchData: {
        isHot: '',
        isClock: '',
        phoneOrName: '',
        startTime: '',
        endTime: '',
        enterpriseId: '',
        current: 1,
        size: 10
      },
      total: 0,
      isExport: false,
      isModal: false,
      addressName: '',
      mapSearchKeyword: '',
      actionMapCenter: { lng: 104.06, lat: 30.67 },
      actionMapZoom: 14,
      viewMapCenter: { lng: 0, lat: 0 },
      viewMapZoom: 15,
      openMapSearch: false,
      lat: '',
      lng: '',
      distance: ''
    };
  },
  created() {
    this.searchData.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.getCardList();
  },
  components: {
    taskContainer
  },
  methods: {
    handleClickForSearch(e) {
      const _self = this;
      /* 创建地址解析器的实例 */
      const geoCoder = new BMap.Geocoder();
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, location => {
        _self.lng = location.point.lng;
        _self.lat = location.point.lat;
        _self.addressName = location.address;
        _self.mapSearchKeyword = this.addressName;
        _self.openMapSearch = true;
      });
    },
    onInputSearch() {
      this.mapSearchKeyword = this.addressName;
      if (this.mapSearchKeyword) {
        this.openMapSearch = true;
      } else {
        this.openMapSearch = false;
      }
    },
    onSearchResultSelect(poi) {
      const _self = this;
      /* 创建地址解析器的实例 */
      const geoCoder = new BMap.Geocoder();
      _self.lng = poi.point.lng;
      _self.lat = poi.point.lat;
      _self.openMapSearch = false;
    },
    actionHandler() {
      this.actionMapCenter = { lng: 104.06, lat: 30.67 };
      this.actionMapZoom = 14;
    },
    openSet() {
      this.isModal = true;
    },
    getDate(val) {
      this.searchData.startTime = val[0];
      this.searchData.endTime = val[1];
    },
    handlePage(page) {
      this.searchData.current = page;
      this.getCardList();
    },
    handlePageSize(size) {
      this.searchData.size = size;
      this.getCardList();
    },
    getCardList() {
      companyApi.cardList(this.searchData).then(res => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    setRecord() {
      if (this.distance == '') {
        this.$Message.info('请填写范围大小');
      } else if (this.lng == '' || this.addressName=="") {
        this.$Message.info('请选择地址');
      } else {
        companyApi
          .setRecord({
            enterpriseId: this.$store.state.user.userInfo.deptId,
            lon: this.lng,
            lat: this.lat,
            recordPlace: this.addressName,
            distance: this.distance
          })
          .then(res => {
            this.$Message.success('设置成功');
            this.isModal = false;
          })
          .catch(err => {
            this.$Message.error(err.response.data.message);
          });
      }
    },
    exportCard() {
      companyApi
        .exportCard(this.searchData)
        .then(res => {
          let blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel,charset=UTF-8'
          }); // res.data是后台返回的内容
          let objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = objectUrl;
          a.download = '打卡统计表.xls';
          a.click();
          this.$Message.success('操作成功');
          this.isExport = false;
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
          this.isExport = false;
        });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  .topBar {
    width: 100%;
    height: 80px;
    color: aqua;
    background-color: #444;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sysName {
      margin-left: 20px;
      span {
        font-size: 24px;
      }
    }
    .userExit {
      margin-right: 20px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
.map {
  width: 100%;
  height: 320px;
}
</style>
