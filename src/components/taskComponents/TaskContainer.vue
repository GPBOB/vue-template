<template>
  <div class="task_container">
    <Row style="height: 100%;">
      <Col span="24">
        <div class="my_task_top">
          <p class="my_task_top_title">
            <span class="my_task_title">{{ title }}</span>
          </p>
          <Button
            type="primary"
            @click="taskBtnMethod"
            v-if="!isShade && !isShadeBtn"
          >
            <Icon :type="btnIcon" :size="20" />
            {{ btnTitle }}
          </Button>
          <div style="color: #97A0AF;font-size: 14px" v-if="hintTitle">
            {{ hintTitle }}
          </div>
          <slot name="right_btn"></slot>
        </div>
      </Col>
      <Col span="24" style="height: calc(100% - 50px);">
        <slot></slot>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'TaskContainer',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default() {
        return '';
      }
    },
    isShade: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isShadeBtn: {
      type: Boolean,
      default() {
        return false;
      }
    },
    btnIcon: {
      type: String,
      default() {
        return 'ios-create-outline';
      }
    },
    btnTitle: {
      type: String,
      default() {
        return '发布任务';
      }
    },
    hintTitle: {
      type: String,
      default() {
        return '';
      }
    }
  },
  methods: {
    taskBtnMethod() {
      this.$emit('taskBtnMethod');
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/task.less";

.task_container {
  width: 100%;
  height: 100%;
  padding: 10px;

  .my_task_top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 10px;

    .my_task_top_title {
      line-height: 32px;

      .my_task_title_line {
        display: block;
        height: 100%;
        width: 4px;
        background-color: #1fb3f7;
        border-radius: 4px;
        line-height: 32px;
        float: left;
      }

      .my_task_title {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
</style>
