function decending(a, b) {
  return b.count - a.count;
}

function initializeNodesArray(numberOfNodes) {
  let arr = [];
  for (let i = 0; i < numberOfNodes; i++) {
    arr.push({ entities: [], count: 0 });
  }
  return arr;
}
function distributeEntities(identities, numberOfNodes) {
  if (!numberOfNodes || !identities) return;

  identities.sort(decending);
  const nodes = initializeNodesArray(numberOfNodes);

  while (identities.length > 0) {
    let minNode = nodes.sort(decending).pop();
    const maxIdentity = identities.shift();
    minNode.entities.push(maxIdentity.entities);
    minNode.count += maxIdentity.count;
    nodes.push(minNode);
  }

  return nodes;
}
