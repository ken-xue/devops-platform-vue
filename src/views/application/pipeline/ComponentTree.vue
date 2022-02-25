<template>
  <el-aside width="240px"
            class="left">
    <div class="search">
      <el-input placeholder="搜索节点"
                size="small"
                v-model="filterText">
        <i slot="prefix"
           class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
<!--    <el-tree :data="nodeData"-->
<!--             node-key="id"-->
<!--             :default-expanded-keys="['source','preHandle','sign','learn']"-->
<!--             icon-class="el-icon-arrow-right"-->
<!--             :render-content="renderContentFunction"-->
<!--             :filter-node-method="filterNode"-->
<!--             ref="tree2"-->
<!--             :props="defaultProps"></el-tree>-->
    <el-tree :data="nodeData"
             node-key="id"
             icon-class="el-icon-arrow-right"
             :render-content="renderContentFunction"
             :filter-node-method="filterNode"
             ref="tree2"
             :props="defaultProps"></el-tree>
  </el-aside>
</template>

<script>
import Vue, {CreateElement} from 'vue';
import API from './api';
import {getMenuData} from './mock';
import {list} from '@/api/app/node'
import {pageAppInfo} from "@/api/app/app";
import {nestedGetQuery} from "@/utils";

export default Vue.extend({
  data() {
    return {
      nodeData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  created() {
    list().then(response => {
      this.nodeData = response.data
    })
  },
  mounted() {
    // list({}).then(response=> {
    //   this.nodeData = response.data
    // })
    // this.nodeData = getMenuData
    // API.getMenuData().then((data) => {
    //   this.nodeData = data.data;
    // });
  },
  methods: {
    renderContentFunction(h, {node, data, store}) {
      const className = node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder';
      const classNameChild = (!data.children && data.icon) ? data.icon : '';
      return h('div', {
        class: {leafNode: !data.children},
        style: {
          height: '38px',
          lineHeight: '38px',
          fontSize: '12px',
          color: '#1b1c23',
        },
      }, [
        h('el-tooltip', {
          attrs: {
            content: data.label,
            placement: 'top-end',
            disabled: !!data.children,
          },
        }, [
          h('span', {
            attrs: {
              draggable: !data.children,
              id: data.id,
            },
            on: {
              dragstart: this.dragHandle,
            },
            class: 'node',
            style: {
              display: 'inline-block',
              marginTop: '4px',
              height: '30px',
              lineHeight: '30px',
              width: '140px',
              borderRadius: '4px',
              position: 'relative',
              outline: 'none',
              border: !data.children ? '1px solid transparent' : 'none',
            },
          }, [
            h('i', {
              class: {
                [className]: !!data.children,
                [classNameChild]: !data.children,
              },
              style: {
                color: '#00cdea',
                marginLeft: data.children ? '10px' : '15px',
              },
            }),
            h('span', {
              style: {
                fontSize: '13px',
                marginLeft: '10px',
              },
            }, data.label),
          ]),
        ]),
      ]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    dragHandle(ev) {
      ev.dataTransfer.setData('target', ev.target.id);
    },
  },
});
</script>
