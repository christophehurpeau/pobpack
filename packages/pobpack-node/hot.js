/* eslint-disable */
/*
 * copied from https://github.com/webpack/webpack/blob/master/hot/signal.js
 * and tweeked to always accept updates
 */
/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */
/*globals __resourceQuery */
if(!module.hot) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}
if (!process.send) {
    throw new Error("[HMR] You need to spawn the process.");
}
var checkForUpdate = function checkForUpdate(fromUpdate) {
  module.hot.check().then(function(updatedModules) {
    if(!updatedModules) {
      if(fromUpdate)
        console.log("[HMR] Update applied.");
      else
        console.warn("[HMR] Nothing to update.");
      return;
    }

    return module.hot.apply({
      ignoreUnaccepted: true,
      onUnaccepted: function(data) {
        console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
      },
    }).then(function(renewedModules) {
      const unacceptedModules = updatedModules.filter(moduleId => (
        renewedModules && !renewedModules.includes(moduleId)
      ));
      require("webpack/hot/log-apply-result")(updatedModules, renewedModules);
      if (unacceptedModules.length) {
        process.send('restart');
        return;
      }

      checkForUpdate(true);
    });
  }).catch(function(err) {
    var status = module.hot.status();
    if(["abort", "fail"].indexOf(status) >= 0) {
      console.warn("[HMR] Cannot apply update.");
      console.warn("[HMR] " + err.stack || err.message);
    } else {
      console.warn("[HMR] Update failed: " + err.stack || err.message);
    }
    process.send('restart');
  });
};

process.on(__resourceQuery.substr(1) || "SIGUSR2", function() {
  if(module.hot.status() !== "idle") {
    console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
    console.warn("[HMR] Need to be in idle state to start hot update.");
    return;
  }

  checkForUpdate();
});
