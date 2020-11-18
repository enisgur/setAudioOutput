async function setArguments(availableArguments, processArgs) {
  let arguments = [];
  let returnArgs = {};

  processArgs.forEach((val, index) => {
    if (index > 1) {
      const arg = val.split("=");

      arguments.push(arg);
    }
    // console.log(arguments);
    return arguments;
  });

  await arguments.map((argument) => {
    availableArguments.map((available) => {
      if (argument[0] === available)
        return (returnArgs[available] = argument[1]);
    });
  });

  return returnArgs;
}

module.exports = {
  setArguments: setArguments,
};

// const _setArguments = setArguments;
// export { _setArguments as setArguments };
// exports.setArguments = setArguments;

// setArguments(["-so", "-name"])
//   .then((res) => {
//     return res;
//     // console.log("DONE : ", name, so);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });
