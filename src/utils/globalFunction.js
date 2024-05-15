globalThis.getProvinceName = (id) => {
  const province = PROVINCE.find((p) => p.id == id);
  if (province) {
    return province.name;
  } else {
    return false;
  }
};

globalThis.wait = (time = randomTime()) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

globalThis.randomTime = (min = 300, max = 1000) => {
  const rand = Math.random() * (max - min);
  return parseInt(rand + min);
};
