const { Subject } = require("rxjs");
const PollingBlockTracker = require("eth-block-tracker");

const fromPolling = ({ web3, pollingInterval }) => {
  // patch missing method
  web3.currentProvider.sendAsync = web3.currentProvider.send;

  // instantiate block tracker
  const provider = web3.currentProvider;
  const blockTracker = new PollingBlockTracker({ provider, pollingInterval });

  const observable = new Subject();
  blockTracker
    .on("latest", async blockNum => {
      // get full block info with `web3.eth.getBlock`
      const block = await web3.eth.getBlock(blockNum, true);
      observable.next(block);
    })
    .on("error", err => observable.next(err));

  return {
    observable,
    cleanup: () => {
      blockTracker.removeAllListeners("latest");
      observable.complete();
    },
  };
};

module.exports = fromPolling;
