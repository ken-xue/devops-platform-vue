import { CONNECTORSEPARATESYMBOL } from './const';

export default function flowExec({ instance }) {
  /**
   * @description 模拟延时效果
   * @param {function} fn
   * @param {number} time
   * @returns
   */
  function timeout(fn, time) {
    return new Promise((res) => {
      setTimeout(() => {
        fn();
        res(true);
      }, time);
    });
  }

  function changeStateByNodeId(nodeId, state) {
    const nodeEl = document.getElementById(nodeId);
    nodeEl.vNode.$children[0].state = state;
  }

  function getConnectorByUuids(uuids) {
    const edge = uuids.join(CONNECTORSEPARATESYMBOL);
    const connectors = instance.getAllConnections();
    const connector = connectors.find(c => c.getUuids().join(CONNECTORSEPARATESYMBOL) === edge);
    return connector;
  }

  function blingConnectors(edges) {
    const connectors = instance.getAllConnections();
    connectors.forEach((c) => {
      c.canvas.classList.remove('active');
    });

    edges.forEach((edge) => {
      const c = getConnectorByUuids(edge.split(CONNECTORSEPARATESYMBOL));
      c.canvas.classList.add('active');
    });
  }

  //前端判断逻辑：
  // 如果接收到的节点是loading状态则把所有接收到的边设置为remove('active')
  // 如果接收到的节点是success状态则把所有接收到的边设置为add('active')
  // this.execModel = () => {
  //   console.log('--------改变节点状态------')
  //   changeStateByNodeId('node-c40d8e60caef11ec9199672631f691b0', 'loading');
  //   return timeout(() => {
  //     changeStateByNodeId('node-c40d8e60caef11ec9199672631f691b0', 'success');
  //     changeStateByNodeId('node-e4b47930caef11ec9199672631f691b0', 'loading');
  //     blingConnectors(['"source-c40d8e62caef11ec9199672631f691b0&&target-e4b4a040caef11ec9199672631f691b0"', 'source-c40d8e62caef11ec9199672631f691b0&&target-ed25e181caef11ec9199672631f691b0']);
  //   }, 3000)
  //     .then(() => timeout(() => {
  //       changeStateByNodeId('node-f30d4390caef11ec9199672631f691b0', 'success');
  //       changeStateByNodeId('node-c6ece090caef11ec9199672631f691b0', 'loading');
  //       blingConnectors(['source-ed25e182caef11ec9199672631f691b0&&target-c6ece094caef11ec9199672631f691b0', 'source-f30d4392caef11ec9199672631f691b0&&target-c6ece091caef11ec9199672631f691b0']);
  //     }, 4000))
  //     .then(() => timeout(() => {
  //       changeStateByNodeId('node-c6ece090caef11ec9199672631f691b0', 'success');
  //       changeStateByNodeId('node-ed25e180caef11ec9199672631f691b0', 'failed');
  //       blingConnectors(['source-e4b4a041caef11ec9199672631f691b0&&target-f30d4391caef11ec9199672631f691b0']);
  //     }, 5000));
  // };
  this.execModel = (e)=> {
    const data = JSON.parse(e)
    console.log('--------节点执行状态接收数据------')
    console.log(data)
    console.log('--------节点执行状态接收数据------')
    changeStateByNodeId(data.nodes.id,data.nodes.data.nodeState)
    blingConnectors(data.edges)
  };
}
